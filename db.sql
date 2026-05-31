CREATE DATABASE IF NOT EXISTS user;

USE user;

drop table if exists mainUser;

CREATE TABLE IF NOT EXISTS mainuser (
    user_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email_id VARCHAR(100) UNIQUE NOT NULL,
    primary_mobile VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL COMMENT 'Store hashed passwords only (e.g., bcrypt/argon2)',
    profile_picture VARCHAR(255) DEFAULT NULL COMMENT 'URL or file path to the image',
    gender ENUM('Male', 'Female', 'Other', 'Prefer Not to Say') DEFAULT 'Prefer Not to Say',
    date_of_birth DATE DEFAULT NULL,
    residential_address TEXT DEFAULT NULL,
    aadhar_card_no VARCHAR(12) UNIQUE DEFAULT NULL COMMENT '12-digit UID',
    pan_card_no VARCHAR(10) UNIQUE DEFAULT NULL COMMENT '10-character alphanumeric',
    joining_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Soft delete or ban toggle',
    is_verified BOOLEAN DEFAULT FALSE COMMENT 'Email/Phone OTP verification status',
    last_login_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (email_id),
    INDEX idx_user_username (username),
    INDEX idx_user_mobile (primary_mobile)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS branch_management (

    branch_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    branch_name VARCHAR(100) NOT NULL,

    branch_type VARCHAR(100) DEFAULT NULL,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
    ON UPDATE CURRENT_TIMESTAMP

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;