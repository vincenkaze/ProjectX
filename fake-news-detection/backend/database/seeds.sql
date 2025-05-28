INSERT INTO sources (name, url_text) VALUES
('Simple News', 'https://simple-news.com'),
('Quick Updates', 'https://quick-updates.org');

-- Example: password is "admin123"
INSERT INTO admins (username, password_hash, email)
VALUES ('admin', '$2b$12$hUuZoDNEoxdVoUSAcKnO1.y2LPK9n4RNdqlYtF8RBkP75E4i1L6im', 'admin@newscheck.test');