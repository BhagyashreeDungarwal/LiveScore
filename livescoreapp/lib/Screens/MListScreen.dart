import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:intl/intl.dart';
import 'MatchScorePage.dart'; // Import MatchScorePage

class MListScreen extends StatefulWidget {
  const MListScreen({Key? key}) : super(key: key);

  @override
  _MListScreenState createState() => _MListScreenState();
}

class _MListScreenState extends State<MListScreen> {
  List<dynamic>? _matches;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _fetchMatches();
  }

  Future<void> _fetchMatches() async {
    setState(() {
      _isLoading = true;
    });
    try {
      final response = await http.get(Uri.parse('http://192.168.71.181:5032/api/Matchs/GetMatchs'));
      if (response.statusCode == 200) {
        setState(() {
          _matches = jsonDecode(response.body);
        });
      } else {
        throw Exception('Failed to load matches. Server responded with status code: ${response.statusCode}');
      }
    } catch (error) {
      print('Error fetching matches: $error');
      setState(() {
        _matches = null;
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : _matches != null
          ? _matches!.isEmpty
          ? Center(
        child: Text(
          'No matches available',
          style: TextStyle(fontSize: 20, color: Colors.grey, fontFamily: 'Roboto'),
        ),
      )
          : ListView.builder(
        itemCount: _matches!.length,
        itemBuilder: (context, index) {
          final match = _matches![index];
          return GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => MatchScorePage(
                    matchId: match['mid'],
                    matchGroup: match['matchGroup'] ?? 'defaultGroup',
                  ),
                ),
              );
            },
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Card(
                elevation: 4,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      // Players' Images and Names
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              CircleAvatar(
                                radius: 50,
                                backgroundColor: Colors.blue,
                                child: CircleAvatar(
                                  radius: 48,
                                  backgroundImage: NetworkImage(
                                    'http://192.168.71.181:5032/images/${match['athleteRedImg']}',
                                  ),
                                ),
                              ),
                              SizedBox(height: 10),
                              Text(
                                '${match['athleteRed'] ?? 'Unknown'}',
                                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, fontFamily: 'Roboto'),
                              ),
                            ],
                          ),
                          Text(
                            'vs',
                            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.red, fontFamily: 'Roboto'),
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              CircleAvatar(
                                radius: 50,
                                backgroundColor: Colors.blue,
                                child: CircleAvatar(
                                  radius: 48,
                                  backgroundImage: NetworkImage(
                                    'http://192.168.71.181:5032/images/${match['athleteBlueImg']}',
                                  ),
                                ),
                              ),
                              SizedBox(height: 10),
                              Text(
                                '${match['athleteBlue'] ?? 'Unknown'}',
                                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, fontFamily: 'Roboto'),
                              ),
                            ],
                          ),
                        ],
                      ),
                      SizedBox(height: 12),
                      // Date
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Date:',
                            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.grey, fontFamily: 'Roboto'),
                          ),
                          Text(
                            '${_formatDate(match['matchDate'])}',
                            style: TextStyle(fontSize: 16, fontFamily: 'Roboto'),
                          ),
                        ],
                      ),
                      SizedBox(height: 8),
                      // Tournament
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Tournament:',
                            style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.grey, fontFamily: 'Roboto'),
                          ),
                          Text(
                            '${match['tournament'] ?? 'Unknown'}',
                            style: TextStyle(fontSize: 16, fontFamily: 'Roboto'),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          );
        },
      )
          : Center(
        child: Text(
          'Failed to fetch matches',
          style: TextStyle(fontFamily: 'Roboto'),
        ),
      ),
    );
  }

  String _formatDate(String? dateString) {
    try {
      final DateTime dateTime = DateTime.parse(dateString ?? '');
      return DateFormat.yMd().format(dateTime);
    } catch (e) {
      print('Error parsing date: $e');
      return 'Unknown';
    }
  }
}
