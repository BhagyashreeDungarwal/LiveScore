USE [LiveScore]
GO
/****** Object:  StoredProcedure [dbo].[UpdateNextMatchId]    Script Date: 5/20/2024 10:02:27 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[UpdateNextMatchId]
	@Umid INT,
    @Flag INT,
    @MatchStatus VARCHAR(50),
    @MatchType VARCHAR(50),
    @NumberOfRound INT
AS
BEGIN
    DECLARE @NextMatchId INT
    DECLARE @MatchGroup INT
    DECLARE @CategoryId INT
    DECLARE @TournamentId INT
    DECLARE @Gender CHAR(6)
    DECLARE @CurrentId INT
    DECLARE @AthleteBlue INT

    -- Get the initial values for CategoryId, TournamentId, and Gender from the specified Umid
    SELECT @CategoryId = [CategoryId], 
           @TournamentId = [TournamentId], 
           @Gender = [Gender],
           @MatchGroup = [MatchGroup]
    FROM [dbo].[Matchss]
    WHERE [MId] = @Umid

    -- Check if the match type is 'Finale'
    IF @MatchType = 'Final'
    BEGIN
        -- Update the Flag and Status column of the row with Umid
        UPDATE [dbo].[Matchss]
        SET [Flag] = @Flag,
            [MatchStatus] = 'Disable'
        OUTPUT inserted.MId
        WHERE MId = @Umid;

        -- Send message indicating the winner of the tournament
        SELECT 'Winner of the tournament is: ' + CAST(@Flag AS VARCHAR(10)) AS WinnerMessage;
    END
    ELSE
    BEGIN
        -- Create a temporary table to store the matches
        CREATE TABLE #Matches (RowNum INT IDENTITY(1,1), MId INT, MatchGroup INT, AthleteBlue INT)

        -- Insert the matches with the same CategoryId, TournamentId, and Gender into the temporary table
        INSERT INTO #Matches (MId, MatchGroup, AthleteBlue)
        SELECT [MId], [MatchGroup], [AthleteBlue]
        FROM [dbo].[Matchss]
        WHERE [CategoryId] = @CategoryId 
          AND [TournamentId] = @TournamentId 
          AND [Gender] = @Gender
          AND [MId] >= @Umid -- Start from the given Umid
        ORDER BY [MId]

        -- Get the row count
        DECLARE @RowCount INT
        SELECT @RowCount = COUNT(*) FROM #Matches

        -- Initialize the index
        DECLARE @Index INT = 1

        -- Loop through the temporary table using the index
        WHILE @Index <= @RowCount
        BEGIN
            -- Get the current row values
            SELECT @CurrentId = MId, @MatchGroup = MatchGroup, @AthleteBlue = AthleteBlue
            FROM #Matches
            WHERE RowNum = @Index

            -- Check if AthleteBlue is NULL
            IF @AthleteBlue IS NULL
            BEGIN
                -- Store the Flag value in AthleteBlue column
                UPDATE [dbo].[Matchss]
                SET [AthleteBlue] = @Flag
                OUTPUT inserted.MId
                WHERE [MId] = @CurrentId;

                -- Update the NextMatchId, Flag, and Status column of the row with Umid
                UPDATE [dbo].[Matchss]
                SET NextMatchId = @MatchGroup,
                    [Flag] = @Flag,
                    [MatchStatus] = 'Disable'
                WHERE MId = @Umid;

                -- Clean up the temporary table
                DROP TABLE #Matches

                SELECT @CurrentId AS UpdatedMatchId
                RETURN
            END

            -- Increment the index
            SET @Index = @Index + 1
        END

        -- Clean up the temporary table
        DROP TABLE #Matches

        -- Generate new MatchGroup if no suitable match found or AthleteBlue is not NULL
        SET @NextMatchId = (SELECT MAX([MatchGroup]) + 1 FROM [dbo].[Matchss])

        -- Insert new row with provided data
        INSERT INTO [dbo].[Matchss] ([MatchGroup], [AthleteRed], [NextMatchId], [CategoryId], [TournamentId], [Gender], [MatchStatus], [MatchDate], [MatchType], [NumberOfRound])
        OUTPUT inserted.MId
        SELECT @NextMatchId,  
               @Flag, 
               NULL, 
               @CategoryId, 
               @TournamentId, 
               @Gender,
               @MatchStatus, 
               GETDATE(),
               @MatchType,
               @NumberOfRound

        -- Update the NextMatchId, Flag, and Status column of the row with Umid
        UPDATE [dbo].[Matchss]
        SET 
            [NextMatchId] = @NextMatchId,
            [Flag] = @Flag,
            [MatchStatus] = 'Disable'
        OUTPUT inserted.MId
        WHERE MId = @Umid;

        -- Fetch the ID of the updated row
        SET @NextMatchId = @Umid

        -- Return the ID of the updated row
        SELECT @NextMatchId AS UpdatedMatchId
    END
END
