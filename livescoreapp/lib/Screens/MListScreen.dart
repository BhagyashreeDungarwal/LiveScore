import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';

class MListScreen extends StatefulWidget {
  const MListScreen({Key? key}) : super(key: key);

  @override
  _MListState createState() => _MListState();
}

class _MListState extends State<MListScreen> {
  List<dynamic>? _matches;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchMatches();
  }

  Future<void> _fetchMatches() async {
    try {
      final response = await http.get(Uri.parse('http://192.168.231.181:5032/api/Matchs/GetMatchs'));
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}'); // Debug print the response body

      if (response.statusCode == 200) {
        final List<dynamic> allMatches = jsonDecode(response.body);
        print('All matches: $allMatches'); // Debug print the decoded matches

        // Ensure allMatches is a list of maps and contains the expected keys
        if (allMatches is List && allMatches.isNotEmpty && allMatches[0] is Map) {
          final List<dynamic> enabledMatches = allMatches.where((match) {
            print('Match Status: ${match['matchStatus']}'); // Debug print each match status
            return match['matchStatus'] == 'Upcoming' || match['matchStatus'] == 'Live';
          }).toList();
          print('Enabled matches: $enabledMatches'); // Debug print the filtered matches

          setState(() {
            _matches = enabledMatches;
            _isLoading = false;
          });
        } else {
          throw Exception('Unexpected data format');
        }
      } else {
        throw Exception('Failed to load matches. Server responded with status code: ${response.statusCode}');
      }
    } catch (error) {
      print('Error fetching matches: $error');
      setState(() {
        _error = 'Failed to load matches. Please try again later.';
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: _isLoading
            ? CircularProgressIndicator()
            : _error != null
            ? Text(
          _error!,
          style: TextStyle(fontSize: 20, color: Colors.red),
        )
            : _matches!.isEmpty
            ? Text(
          'No matches available',
          style: TextStyle(fontSize: 20),
        )
            : ListView.builder(
          itemCount: _matches!.length,
          itemBuilder: (context, index) {
            final match = _matches![index];
            return _buildMatchTile(match);
          },
        ),
      ),
    );
  }

  Widget _buildMatchTile(Map<String, dynamic> match) {
    // Define color for athlete names
    Color athleteColor = Colors.blue;

    // Parse ISO 8601 date string into DateTime object
    DateTime? matchDate;
    try {
      matchDate = DateTime.parse(match['matchDate'] ?? '');
    } catch (e) {
      print('Error parsing date: $e');
    }

    // Format the date to display only the date part
    String formattedDate = matchDate != null ? DateFormat.yMd().format(matchDate) : 'Unknown';

    return Card(
      elevation: 4,
      margin: EdgeInsets.symmetric(horizontal: 10, vertical: 15),
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: Row(
          children: [
            CircleAvatar(
              radius: 30,
              backgroundImage: AssetImage('assets/redA.png'), // Replace with actual image asset path
            ),
            SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '${match['athleteRed'] ?? ''} vs ${match['athleteBlue'] ?? ''}',
                    style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: athleteColor),
                  ),
                  SizedBox(height: 7),
                  Text(
                    'Date: $formattedDate',
                    style: TextStyle(color: Colors.grey),
                  ),
                  SizedBox(height: 5),
                  Text(
                    'Location: ${match['tournamentId'] ?? 'Unknown'}',
                    style: TextStyle(color: Colors.grey),
                  ),
                ],
              ),
            ),
            CircleAvatar(
              radius: 30,
              backgroundImage: AssetImage('assets/blueA.png'), // Replace with actual image asset path
            ),
          ],
        ),
      ),
    );
  }
}
