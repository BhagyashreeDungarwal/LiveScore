USE [LiveScores]
GO
/****** Object:  StoredProcedure [dbo].[UpdateNextMatchId]    Script Date: 5/16/2024 10:07:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[UpdateNextMatchId]
	@Umid INT,
    @Flag INT,
    @MatchStatus VARCHAR(50),
    @MatchType VARCHAR(50),
    @NumberOfRound INT
AS
BEGIN
    DECLARE @NextMatchId INT

    -- Check for live matches
    IF EXISTS (
        SELECT 1
        FROM [dbo].[Matchss]
        WHERE [MatchStatus] = 'Live'
    )
    BEGIN
        -- Get the last inserted match
        SELECT TOP 1 @NextMatchId = [MatchGroup]
        FROM [dbo].[Matchss]
        ORDER BY [MId] DESC

        -- Check if AthleteBlue is NULL in the last inserted match
        IF NOT EXISTS (
            SELECT 1
            FROM [dbo].[Matchss]
			--MatchGroup is id which doent have primarykey
            WHERE [MatchGroup] = @NextMatchId 
            AND [AthleteBlue] IS NOT NULL
        )
        BEGIN
            -- Check if the tournamentId and categoryId are the same
            IF EXISTS (
                SELECT 1
                FROM [dbo].[Matchss]
                WHERE [MatchGroup] = @NextMatchId 
                AND [TournamentId] = (SELECT [TournamentId] FROM [dbo].[Matchss] WHERE [MatchGroup] = @NextMatchId) 
                AND [CategoryId] = (SELECT [CategoryId] FROM [dbo].[Matchss] WHERE [MatchGroup] = @NextMatchId)
            )
            BEGIN
			-- SCOPE_IDENTITY() function in SQL Server to retrieve the ID of the row that was updated.
			-- Performing an update, we might want to use the OUTPUT clause instead to capture the ID of the updated row.
                -- Store the Flag value in AthleteBlue column
                UPDATE [dbo].[Matchss]
                SET [AthleteBlue] = @Flag
                OUTPUT inserted.MId
                WHERE [MatchGroup] = @NextMatchId 

				--Update the NextMatchId,Flag and Status column of the row with Umid
				UPDATE [dbo].[Matchss]
				SET NextMatchId = (SELECT TOP 1 MatchGroup FROM [dbo].[Matchss] ORDER BY MId DESC),
					[Flag] = @Flag,
					[MatchStatus] = 'Disable'
				FROM [dbo].[Matchss]
				WHERE MId = @Umid;

            END
        END
        ELSE
        BEGIN
            -- Generate new MatchGroup
            SET @NextMatchId = (SELECT MAX([MatchGroup]) + 1 FROM [dbo].[Matchss])

            -- Insert new row with provided data
            INSERT INTO [dbo].[Matchss] ([MatchGroup], [AthleteRed], [NextMatchId], [CategoryId], [TournamentId], [MatchStatus], [MatchDate], [MatchType],[NumberOfRound])
            OUTPUT inserted.MId
            SELECT @NextMatchId,  
                   @Flag, 
                   NULL, 
                   [CategoryId], 
                   [TournamentId], 
                   @MatchStatus, 
                   GETDATE(),
                   @MatchType,
                   @NumberOfRound
            FROM [dbo].[Matchss]
            WHERE [MatchGroup] = @NextMatchId - 1
		
		--UPDATE statement using a CASE statement to update each column conditionally.
		--Update the NextMatchId,Flag and Status column of the row with Umid
				UPDATE [dbo].[Matchss]
				SET 
					[NextMatchId] = CASE WHEN MId = @Umid THEN @NextMatchId ELSE NextMatchId END,
					[Flag] = CASE WHEN MId = @Umid THEN @Flag ELSE [Flag] END,
					[MatchStatus] = CASE WHEN MId = @Umid THEN 'Disable' ELSE [MatchStatus] END
				OUTPUT inserted.MId
				WHERE MId = @Umid;

            -- Fetch the ID of the updated row
			SET @NextMatchId = @Umid			
        END
    END

    -- Return the ID of the updated row
    SELECT @NextMatchId AS UpdatedMatchId
END
