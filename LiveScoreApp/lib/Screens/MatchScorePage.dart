import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:signalr_netcore/signalr_client.dart' as signalr;

class MatchScorePage extends StatefulWidget {
  final int matchId;
  final int matchGroup;

  const MatchScorePage({
    Key? key,
    required this.matchId,
    required this.matchGroup,
  }) : super(key: key);

  @override
  _MatchScorePageState createState() => _MatchScorePageState();
}

class _MatchScorePageState extends State<MatchScorePage> {
  late Future<Map<String, dynamic>> _matchDetails;
  Map<String, dynamic>? _liveScore;
  int _currentRound = 0; // Track the current round number
  String? _roundWinner; // Track the winner of the round

  late signalr.HubConnection _hubConnection;

  @override
  void initState() {
    super.initState();
    _matchDetails = _fetchMatchDetails();
    _initSignalRConnection();
  }

  void _initSignalRConnection() async {
    _hubConnection = signalr.HubConnectionBuilder()
        .withUrl('http://192.168.0.106:5032/scorehub')
        .build();

    _hubConnection.on('ReceiveTotalScore',
        (List<Object?>? parameters) => _handleMatchScoreUpdate(parameters));

    _hubConnection.on('GetRounds', (List<Object?>? parameters) {
      if (parameters != null && parameters.isNotEmpty) {
        int round = parameters[0] as int;
        setState(() {
          _currentRound = round;
        });
        print('Received round: $round');
        // Optionally update UI or other logic based on received round
      }
    });


    _hubConnection.on('ReceiveRoundWinner', (List<Object?>? parameters) {
      if (parameters != null && parameters.isNotEmpty) {
        dynamic roundWinner = parameters[0];
        setState(() {
          _roundWinner = roundWinner.toString();
        });
        print('Received round winner: $roundWinner');
        // Optionally show a snackbar or toast with the winner information
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Winner of the round: $_roundWinner'),
            duration: Duration(seconds: 3), // Adjust duration as needed
          ),
        );
      }
    });

    try {
      await _hubConnection.start();
      print('SignalR connection established.');
      await _hubConnection
          .invoke('JoinGroup', args: [widget.matchGroup.toString()]);
      await _hubConnection.invoke('GetTotalScore', args: [widget.matchGroup]);
    } catch (error) {
      print('Error establishing SignalR connection: $error');
    }
  }

  void _handleMatchScoreUpdate(List<Object?>? parameters) {
    if (parameters != null && parameters.isNotEmpty) {
      final Map<String, dynamic> scoreData =
          parameters[0] as Map<String, dynamic>;

      setState(() {
        _liveScore = {
          'totalRedPoints': scoreData['totalRedPoints'],
          'totalBluePoints': scoreData['totalBluePoints'],
          'RedPenalty': scoreData['RedPenalty'],
          'BluePenalty': scoreData['BluePenalty'],
        };
      });
    }
  }

  Future<Map<String, dynamic>> _fetchMatchDetails() async {
    try {
      final response = await http.get(Uri.parse(
          'http://192.168.0.106:5032/api/Matchs/GetMatchById/${widget.matchId}'));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception(
            'Failed to load match details. Server responded with status code: ${response.statusCode}');
      }
    } catch (error) {
      print('Error fetching match details: $error');
      throw Exception('Failed to fetch match details');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Live Score'),
        centerTitle: true,
        backgroundColor: Colors.blue,
        elevation: 0, // Removes elevation
      ),
      body: FutureBuilder<Map<String, dynamic>>(
        future: _matchDetails,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data == null) {
            return Center(child: Text('No data available'));
          } else {
            final matchDetails = snapshot.data!;
            return Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [Colors.blueAccent, Colors.indigo],
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Text(
                      '${matchDetails['athleteRed']} vs ${matchDetails['athleteBlue']}',
                      style: TextStyle(
                        fontSize: 30,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  Expanded(
                    child: Container(
                      padding: EdgeInsets.symmetric(horizontal: 16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius:
                            BorderRadius.vertical(top: Radius.circular(20)),
                      ),
                      child: SingleChildScrollView(
                        child: Column(
                          children: [
                            SizedBox(height: 20),
                            _buildTeamScores(matchDetails),
                            SizedBox(height: 20),
                            _buildScoreDetails(
                                'Red Penalty', _liveScore?['RedPenalty'] ?? 0),
                            SizedBox(height: 12),
                            _buildScoreDetails('Blue Penalty',
                                _liveScore?['BluePenalty'] ?? 0),
                            SizedBox(height: 20),
                            Text(
                              'Round: $_currentRound',
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Colors.black,
                              ),
                            ),
                            SizedBox(height: 20),
                            if (_roundWinner != null)
                              Text(
                                'Winner of the Round: $_roundWinner',
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.green,
                                ),
                              ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            );
          }
        },
      ),
    );
  }

  Widget _buildTeamScores(Map<String, dynamic> matchDetails) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        _buildTeamScore('${matchDetails['athleteRed']}',
            _liveScore?['totalRedPoints'], Colors.red),
        _buildTeamScore('${matchDetails['athleteBlue']}',
            _liveScore?['totalBluePoints'], Colors.blue),
      ],
    );
  }

  Widget _buildTeamScore(String team, dynamic score, Color color) {
    return Column(
      children: [
        Text(
          team,
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: color,
          ),
        ),
        Text(
          '${score ?? 0}',
          style: TextStyle(
            fontSize: 48,
            fontWeight: FontWeight.bold,
            color: color,
          ),
        ),
      ],
    );
  }

  Widget _buildScoreDetails(String label, int score) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: Colors.black87,
          ),
        ),
        Text(
          '$score',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: Colors.black87,
          ),
        ),
      ],
    );
  }

  @override
  void dispose() {
    _hubConnection.stop();
    super.dispose();
  }
}
