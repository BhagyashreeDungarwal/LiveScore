USE [LiveScores]
GO
/****** Object:  StoredProcedure [dbo].[InsertMatch]    Script Date: 5/16/2024 10:07:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[InsertMatch]
    @MatchStatus VARCHAR(50),
    @MatchType VARCHAR(50),
    @NumberOfRound INT,
    @MatchDate DATE,
    @MatchTime TIME,
    @AthleteRed INT,
    @AthleteBlue INT,
    @CategoryId INT,
    @TournamentId INT
AS
BEGIN
    DECLARE @MatchGroup INT;

    -- Step 1: Determine MatchGroup
    SELECT @MatchGroup = ISNULL(MAX(MatchGroup), 0) + 1
    FROM Matchss;

    -- Step 2: Insert into Matchss table
    INSERT INTO Matchss (MatchStatus, MatchType, NumberOfRound, MatchDate,  AthleteRed, AthleteBlue, CategoryId, TournamentId, MatchGroup)
    VALUES (@MatchStatus, @MatchType, @NumberOfRound, @MatchDate,  @AthleteRed, @AthleteBlue, @CategoryId, @TournamentId, @MatchGroup);

    -- Step 3: Display Athlete information including gender based on Category
    SELECT A.AthleteName, A.Email, A.Contact, A.ImageUrl, A.DateOfBirth, A.Gender, A.Height, A.Weight, A.City, A.State
    FROM Athletes A
    INNER JOIN Categories C ON A.CategoryId = C.Cid
    WHERE C.Cid = @CategoryId;

    -- Step 4: Retrieve tournament information
    SELECT TournamentName, Venue, TournamentDate
    FROM Tournaments
    WHERE TId = @TournamentId;

    -- Step 5: Increment MatchGroup for future insertions
    UPDATE Matchss
    SET MatchGroup = MatchGroup + 1;

END;
