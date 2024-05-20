USE [LiveScore]
GO
/****** Object:  StoredProcedure [dbo].[InsertMatchs]    Script Date: 5/20/2024 12:24:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[InsertMatchs]
    @MatchStatus VARCHAR(50),
    @MatchType VARCHAR(50),
    @NumberOfRound INT,
    @MatchDate DATE,
    @Gender VARCHAR(50),
    @AthleteRed INT,
    @AthleteBlue INT,
    @CategoryId INT,
    @TournamentId INT
AS
BEGIN
    DECLARE @MatchGroup INT, @AthleteRedGender VARCHAR(50), @AthleteBlueGender VARCHAR(50);

    -- Check if both athletes have the same gender
    SELECT @AthleteRedGender = Gender FROM Athletes WHERE Id = @AthleteRed;
    SELECT @AthleteBlueGender = Gender FROM Athletes WHERE Id = @AthleteBlue;

    IF @AthleteRedGender <> @AthleteBlueGender
    BEGIN
        RAISERROR('Athlete genders do not match.', 16, 1); -- Corrected RAISERROR spelling
        RETURN; -- Exit the stored procedure if genders do not match
    END

	 -- Check if the gender matches the athletes' genders
    IF @Gender <> @AthleteRedGender OR @Gender <> @AthleteBlueGender
    BEGIN
        RAISERROR('Gender does not match athlete genders.', 16, 1);
        RETURN; -- Exit the stored procedure if gender does not match athlete genders
    END

    -- Step 1: Determine MatchGroup
    SELECT @MatchGroup = ISNULL(MAX(MatchGroup), 0) + 1
    FROM Matchss;

    -- Step 2: Insert into Matchss table
    INSERT INTO Matchss (MatchStatus, MatchType, NumberOfRound, MatchDate, Gender, AthleteRed, AthleteBlue, CategoryId, TournamentId, MatchGroup)
    VALUES (@MatchStatus, @MatchType, @NumberOfRound, @MatchDate,@Gender,  @AthleteRed, @AthleteBlue, @CategoryId, @TournamentId, @MatchGroup);

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
