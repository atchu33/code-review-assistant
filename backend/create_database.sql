-- SQL Server Database Setup Script
-- Run this in SQL Server Management Studio or Azure Data Studio

-- Create database if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'CodeReviewDB')
BEGIN
    CREATE DATABASE CodeReviewDB;
END
GO

USE CodeReviewDB;
GO

-- Create Reviews table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Reviews')
BEGIN
    CREATE TABLE Reviews (
        Id            NVARCHAR(36)  PRIMARY KEY,
        Language      NVARCHAR(50)  NOT NULL,
        OriginalCode  NVARCHAR(MAX) NOT NULL,
        ReviewJson    NVARCHAR(MAX) NOT NULL,
        Score         INT           NULL,
        CreatedAt     DATETIME      DEFAULT GETDATE()
    );
    
    -- Create index on CreatedAt for faster sorting
    CREATE INDEX IX_Reviews_CreatedAt ON Reviews(CreatedAt DESC);
    
    -- Create index on Language for filtering
    CREATE INDEX IX_Reviews_Language ON Reviews(Language);
END
GO

-- Verify table creation
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH
FROM 
    INFORMATION_SCHEMA.COLUMNS
WHERE 
    TABLE_NAME = 'Reviews'
ORDER BY 
    ORDINAL_POSITION;
GO

PRINT 'Database setup completed successfully!';
