import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class SearchScreen extends StatefulWidget {
  const SearchScreen({Key? key}) : super(key: key);

  @override
  _SearchScreenState createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  List<dynamic>? _athletes;
  List<dynamic>? _filteredAthletes;
  Timer? _debounceTimer;

  @override
  void initState() {
    super.initState();
    _fetchAthletes();
  }

  Future<void> _fetchAthletes() async {
    try {
      final response = await http.get(Uri.parse('http://192.168.71.181:5032/api/Athletes/getAthelete'));
      if (response.statusCode == 200) {
        setState(() {
          _athletes = jsonDecode(response.body);
          _filteredAthletes = _athletes; // Initialize filtered list with all athletes
        });
      } else {
        throw Exception('Failed to load athletes. Server responded with status code: ${response.statusCode}');
      }
    } catch (error) {
      print('Error fetching athletes: $error');
      setState(() {
        _athletes = null;
        _filteredAthletes = null;
      });
    }
  }

  void _filterAthletes(String query) {
    if (_debounceTimer != null && _debounceTimer!.isActive) {
      _debounceTimer!.cancel();
    }
    _debounceTimer = Timer(const Duration(milliseconds: 300), () {
      setState(() {
        _filteredAthletes = _athletes!
            .where((athlete) => athlete['athleteName'].toLowerCase().contains(query.toLowerCase()))
            .toList();
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              onChanged: _filterAthletes,
              textCapitalization: TextCapitalization.sentences, // Display capitalized letters
              decoration: InputDecoration(
                labelText: 'Search by name',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(),
              ),
            ),
          ),
          Expanded(
            child: _filteredAthletes != null
                ? _filteredAthletes!.isEmpty
                ? Center(
              child: Text(
                'No athletes found',
                style: TextStyle(fontSize: 20),
              ),
            )
                : ListView.builder(
              itemCount: _filteredAthletes!.length,
              itemBuilder: (context, index) {
                final athlete = _filteredAthletes![index];
                final imageUrl = athlete['imageUrl'] != null
                    ? 'http://192.168.71.181:5032/images/${athlete['imageUrl']}'
                    : null;
                return Card(
                  elevation: 4,
                  margin: EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                  child: ListTile(
                    contentPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                    leading: CircleAvatar(
                      radius: 30,
                      backgroundImage: imageUrl != null
                          ? NetworkImage(imageUrl)
                          : null,
                      child: imageUrl == null
                          ? Icon(Icons.person)
                          : null,
                    ),
                    title: Text(
                      athlete['athleteName'] ?? 'Name not available',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                  ),
                );
              },
            )
                : Center(
              child: CircularProgressIndicator(),
            ),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _debounceTimer?.cancel(); // Cancel the timer to prevent memory leaks
    super.dispose();
  }
}
