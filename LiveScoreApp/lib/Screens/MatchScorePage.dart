import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:signalr_netcore/signalr_client.dart' as signalr;

class MatchScorePage extends StatefulWidget {
  final int matchId;
  final int matchGroup;

  const MatchScorePage({Key? key, required this.matchId, required this.matchGroup}) : super(key: key);

  @override
  _MatchScorePageState createState() => _MatchScorePageState();
}

class _MatchScorePageState extends State<MatchScorePage> {
  late Future<Map<String, dynamic>> _matchDetails;
  Map<String, dynamic>? _liveScore;
  late signalr.HubConnection _hubConnection; // Use prefix to disambiguate HubConnection

  @override
  void initState() {
    super.initState();
    _matchDetails = _fetchMatchDetails();
    _initSignalRConnection();
  }

  void _initSignalRConnection() async {
    _hubConnection = signalr.HubConnectionBuilder().withUrl('http://192.168.71.181:5032/scorehub').build(); // Use prefix to disambiguate HubConnection

    _hubConnection.on('ReceiveTotalScore', (List<Object?>? parameters) => _handleMatchScoreUpdate(parameters));

    try {
      await _hubConnection.start();
      print('SignalR connection established.');
      // Optionally, join a group or request initial data
      await _hubConnection.invoke('JoinGroup', args: [widget.matchGroup.toString()]);
      await _hubConnection.invoke('GetTotalScore', args: [widget.matchGroup]);
    } catch (error) {
      print('Error establishing SignalR connection: $error');
    }
  }

  void _handleMatchScoreUpdate(List<Object?>? parameters) {
    if (parameters != null && parameters.isNotEmpty) {
      final Map<String, dynamic> scoreData = parameters[0] as Map<String, dynamic>;

      setState(() {
        _liveScore = {
          'totalRedPoints': scoreData['totalRedPoints'],
          'totalBluePoints': scoreData['totalBluePoints'],
          'RedPanelty': scoreData['RedPanelty'],
          'BluePanelty': scoreData['BluePanelty'],
        };
      });
    }
  }

  Future<Map<String, dynamic>> _fetchMatchDetails() async {
    try {
      final response = await http.get(Uri.parse('http://192.168.71.181:5032/api/Matchs/GetMatchById/${widget.matchId}'));
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Failed to load match details. Server responded with status code: ${response.statusCode}');
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
        title: Text('Live Score', style: TextStyle(fontFamily: 'Montserrat')),
        backgroundColor: Colors.blue,
      ),
      body: FutureBuilder<Map<String, dynamic>>(
        future: _matchDetails,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) { // Use flutter.ConnectionState
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data == null) {
            return Center(child: Text('No data available'));
          } else {
            final matchDetails = snapshot.data!;
            return Container(
              width: double.infinity,
              height: double.infinity,
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [Colors.blueAccent, Colors.indigo],
                ),
              ),
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    SizedBox(height: 20),
                    Text(
                      '${matchDetails['athleteRed']} vs ${matchDetails['athleteBlue']}',
                      style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Colors.white, fontFamily: 'Roboto'),
                    ),
                    SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        _buildTeamScore('Red', matchDetails['redTotalScore'], Colors.red),
                        _buildTeamScore('Blue', matchDetails['blueTotalScore'], Colors.blue),
                      ],
                    ),
                    SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        _buildPoints('Total Red Points', _liveScore?['totalRedPoints'] ?? 0),
                        _buildPoints('Total Blue Points', _liveScore?['totalBluePoints'] ?? 0),
                      ],
                    ),
                    SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        _buildPenalty('Red Penalty', _liveScore?['RedPanelty'] ?? 0),
                        _buildPenalty('Blue Penalty', _liveScore?['BluePanelty'] ?? 0),
                      ],
                    ),
                    SizedBox(height: 20),
                    // Add additional UI elements as needed
                  ],
                ),
              ),
            );
          }
        },
      ),
    );
  }

  Widget _buildTeamScore(String team, dynamic score, Color color) {
    return Column(
      children: [
        Text(
          team,
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: color, fontFamily: 'Roboto'),
        ),
        Text(
          '${score ?? 0}',
          style: TextStyle(fontSize: 48, fontWeight: FontWeight.bold, color: color, fontFamily: 'Roboto'),
        ),
      ],
    );
  }

  Widget _buildPoints(String label, int points) {
    return Column(
      children: [
        Text(
          label,
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white, fontFamily: 'Roboto'),
        ),
        Text(
          '$points',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white, fontFamily: 'Roboto'),
        ),
      ],
    );
  }

  Widget _buildPenalty(String label, int penalty) {
    return Column(
      children: [
        Text(
          label,
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white, fontFamily: 'Roboto'),
        ),
        Text(
          '$penalty',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white, fontFamily: 'Roboto'),
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
