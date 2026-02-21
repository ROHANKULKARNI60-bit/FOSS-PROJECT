
CREATE DATABASE IF NOT EXISTS polling_app
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE polling_app;

#----------------------------------------------
CREATE TABLE users (
    id            BIGINT UNSIGNED     NOT NULL AUTO_INCREMENT,
    username      VARCHAR(50)         NOT NULL,
    email         VARCHAR(255)        NOT NULL,
    password_hash VARCHAR(255)        NOT NULL,
    display_name  VARCHAR(100)        NULL,
    role          ENUM('user','moderator','admin') NOT NULL DEFAULT 'user',
    is_active     TINYINT(1)          NOT NULL DEFAULT 1,
    created_at    DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at    DATETIME            NULL,          -- soft delete

    PRIMARY KEY (id),
    UNIQUE KEY uq_users_username  (username),
    UNIQUE KEY uq_users_email     (email),
    INDEX        idx_users_role        (role),
    INDEX        idx_users_is_active   (is_active),
    INDEX        idx_users_created_at  (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
#--------------------------------------------------------------

CREATE TABLE polls (
    id            BIGINT UNSIGNED     NOT NULL AUTO_INCREMENT,
    creator_id    BIGINT UNSIGNED     NOT NULL,
    title         VARCHAR(255)        NOT NULL,
    description   TEXT                NULL,  
    status        ENUM('draft','active','closed','archived','counting') NOT NULL DEFAULT 'draft',
    starts_at     DATETIME            NULL,
    ends_at       DATETIME            NULL,
    created_at    DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at    DATETIME            NULL,          -- soft delete

    PRIMARY KEY (id),
    CONSTRAINT fk_polls_creator
        FOREIGN KEY (creator_id) REFERENCES users (id)
        ON UPDATE CASCADE ON DELETE RESTRICT,

    INDEX idx_polls_creator_id  (creator_id),
    INDEX idx_polls_status      (status),
    INDEX idx_polls_starts_at   (starts_at),
    INDEX idx_polls_ends_at     (ends_at),


    CONSTRAINT chk_polls_max_choices CHECK (max_choices >= 1),
    -- ends_at must be after starts_at when both are set
    CONSTRAINT chk_polls_dates CHECK (ends_at IS NULL OR starts_at IS NULL OR ends_at > starts_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#--------------------------------------------------------------------------------

CREATE TABLE poll_options (
    id            BIGINT UNSIGNED     NOT NULL AUTO_INCREMENT,
    poll_id       BIGINT UNSIGNED     NOT NULL,
    option_text   VARCHAR(500)        NOT NULL,
    display_order SMALLINT UNSIGNED   NOT NULL DEFAULT 0,
    created_at    DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    CONSTRAINT fk_poll_options_poll
        FOREIGN KEY (poll_id) REFERENCES polls (id)
        ON UPDATE CASCADE ON DELETE CASCADE,

    INDEX idx_poll_options_poll_id (poll_id),
    -- Unique ordering per poll
    UNIQUE KEY uq_poll_options_order (poll_id, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#-----------------------------------------------------------------------

CREATE TABLE votes (
    id            BIGINT UNSIGNED     NOT NULL AUTO_INCREMENT,
    poll_id       BIGINT UNSIGNED     NOT NULL,
    option_id     BIGINT UNSIGNED     NOT NULL,
    user_id       BIGINT UNSIGNED     NULL,         -- NULL when poll is anonymous
    ip_address    VARCHAR(45)         NULL,         -- IPv4/IPv6; used for guest-vote dedup
    created_at    DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    CONSTRAINT fk_votes_poll
        FOREIGN KEY (poll_id)   REFERENCES polls        (id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_votes_option
        FOREIGN KEY (option_id) REFERENCES poll_options (id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_votes_user
        FOREIGN KEY (user_id)   REFERENCES users        (id)
        ON UPDATE CASCADE ON DELETE SET NULL,

    -- One authenticated vote per option per poll
    UNIQUE KEY uq_votes_user_option  (user_id, option_id),

    -- Useful read indexes
    INDEX idx_votes_poll_id    (poll_id),
    INDEX idx_votes_option_id  (option_id),
    INDEX idx_votes_user_id    (user_id),
    INDEX idx_votes_created_at (created_at),
    INDEX idx_votes_ip         (ip_address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
