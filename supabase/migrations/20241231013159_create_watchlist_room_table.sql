CREATE TABLE if not exists room (
  uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL default now(),
  name TEXT NOT NULL,
  entry_pass TEXT NOT NULL,
  UNIQUE (name)
);

create table if not exists watchlist (
  id BIGINT PRIMARY KEY generated always as identity,
  title VARCHAR NOT NULL,
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL default now(),
  likes BIGINT NOT NULL DEFAULT 0,
  room_uuid UUID NOT NULL,
  CONSTRAINT fk_room
        FOREIGN KEY (room_uuid)
        REFERENCES room (uuid)
        ON DELETE CASCADE
);

