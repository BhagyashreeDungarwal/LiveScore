import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:livescoreapp/Screens/AthletesDetails.dart';

class AthleteScreen extends StatefulWidget {
  const AthleteScreen({Key? key}) : super(key: key);

  @override
  _AthletesState createState() => _AthletesState();
}

class _AthletesState extends State<AthleteScreen> {
  List<dynamic>? _athletes;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _fetchAthletes();
  }

  Future<void> _fetchAthletes() async {
    setState(() {
      _isLoading = true;
    });
    try {
      final response = await http.get(Uri.parse('http://192.168.231.181:5032/api/Athletes/getAthelete'));
      if (response.statusCode == 200) {
        setState(() {
          _athletes = jsonDecode(response.body);
        });
      } else {
        throw Exception('Failed to load athletes. Server responded with status code: ${response.statusCode}');
      }
    } catch (error) {
      print('Error fetching athletes: $error');
      setState(() {
        _athletes = null;
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> _refreshAthletes() async {
    await _fetchAthletes();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _isLoading
          ? Center(
        child: CircularProgressIndicator(),
      )
          : RefreshIndicator(
        onRefresh: _refreshAthletes,
        child: _athletes != null
            ? _athletes!.isEmpty
            ? Center(
          child: Text(
            'No athletes available',
            style: TextStyle(fontSize: 20),
          ),
        )
            : ListView.builder(
          itemCount: _athletes!.length,
          itemBuilder: (context, index) {
            final athlete = _athletes![index];
            return Card(
              elevation: 4,
              margin: EdgeInsets.symmetric(horizontal: 10, vertical: 10),
              child: ListTile(
                contentPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                leading: CircleAvatar(
                  radius: 30,
                  child: athlete['http://192.168.231.181:5032/images/'] != null
                      ? Image.network(athlete['imageUrl'])
                      : Icon(Icons.person), // Placeholder icon
                ),
                title: Text(
                  athlete['athleteName'] ?? 'Name not available',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                subtitle: Text(
                  'Age: ${athlete['age'] ?? 'Unknown'}',
                  style: TextStyle(fontSize: 16),
                ),
                trailing: Icon(Icons.arrow_forward),
                onTap: () {
                  // Navigate to AthleteDetails screen
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => AthleteDetails(athlete: athlete),
                    ),
                  );
                },
              ),
            );
          },
        )
            : Center(
          child: Text('Failed to fetch athletes'),
        ),
      ),
    );
  }
}
