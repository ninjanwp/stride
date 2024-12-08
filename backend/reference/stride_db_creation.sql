-- Table: attribute
CREATE TABLE attribute (
    id SERIAL PRIMARY KEY,
    attribute_type_id INT NOT NULL,
    name VARCHAR(50) NOT NULL
);

-- Table: attribute_type
CREATE TABLE attribute_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Table: board
CREATE TABLE board (
    id SERIAL PRIMARY KEY,
    board_type_id INT NOT NULL,
    product_id INT NOT NULL,
    name VARCHAR(50) NOT NULL
);

-- Table: board_type
CREATE TABLE board_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Table: item
CREATE TABLE item (
    id SERIAL PRIMARY KEY,
    board_id INT NOT NULL,
    status_id INT NOT NULL,
    created_by_id INT NOT NULL,
    assigned_to_id INT NOT NULL,
    size_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(1000) NOT NULL
);

-- Table: item_attribute
CREATE TABLE item_attribute (
    id SERIAL PRIMARY KEY,
    item_id INT NOT NULL,
    attribute_id INT NOT NULL,
    value VARCHAR(100) NOT NULL
);

-- Table: member
CREATE TABLE member (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

-- Table: product
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Table: role
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Table: size
CREATE TABLE size (
    id SERIAL PRIMARY KEY,
    size_type_id INT NOT NULL,
    name VARCHAR(50) NOT NULL
);

-- Table: size_type
CREATE TABLE size_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Table: status
CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Table: team
CREATE TABLE team (
    id SERIAL PRIMARY KEY,
    team_type_id INT NOT NULL,
    name VARCHAR(50) NOT NULL
);

-- Table: team_board
CREATE TABLE team_board (
    id SERIAL PRIMARY KEY,
    team_id INT NOT NULL,
    board_id INT NOT NULL
);

-- Table: team_member
CREATE TABLE team_member (
    id SERIAL PRIMARY KEY,
    team_id INT NOT NULL,
    member_id INT NOT NULL
);

-- Table: team_member_role
CREATE TABLE team_member_role (
    id SERIAL PRIMARY KEY,
    team_member_id INT NOT NULL,
    role_id INT NOT NULL
);

-- Table: team_type
CREATE TABLE team_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Foreign Keys
ALTER TABLE attribute
    ADD CONSTRAINT fk_attribute_attribute_type FOREIGN KEY (attribute_type_id)
    REFERENCES attribute_type (id);

ALTER TABLE board
    ADD CONSTRAINT fk_board_board_type FOREIGN KEY (board_type_id)
    REFERENCES board_type (id);

ALTER TABLE board
    ADD CONSTRAINT fk_board_product FOREIGN KEY (product_id)
    REFERENCES product (id);

ALTER TABLE item
    ADD CONSTRAINT fk_item_board FOREIGN KEY (board_id)
    REFERENCES board (id);

ALTER TABLE item
    ADD CONSTRAINT fk_item_size FOREIGN KEY (size_id)
    REFERENCES size (id);

ALTER TABLE item
    ADD CONSTRAINT fk_item_status FOREIGN KEY (status_id)
    REFERENCES status (id);

ALTER TABLE item_attribute
    ADD CONSTRAINT fk_item_attribute_item FOREIGN KEY (item_id)
    REFERENCES item (id);

ALTER TABLE item_attribute
    ADD CONSTRAINT fk_item_attribute_attribute FOREIGN KEY (attribute_id)
    REFERENCES attribute (id);

ALTER TABLE size
    ADD CONSTRAINT fk_size_size_type FOREIGN KEY (size_type_id)
    REFERENCES size_type (id);

ALTER TABLE team
    ADD CONSTRAINT fk_team_team_type FOREIGN KEY (team_type_id)
    REFERENCES team_type (id);

ALTER TABLE team_board
    ADD CONSTRAINT fk_team_board_board FOREIGN KEY (board_id)
    REFERENCES board (id);

ALTER TABLE team_board
    ADD CONSTRAINT fk_team_board_team FOREIGN KEY (team_id)
    REFERENCES team (id);

ALTER TABLE team_member
    ADD CONSTRAINT fk_team_member_member FOREIGN KEY (member_id)
    REFERENCES member (id);

ALTER TABLE team_member
    ADD CONSTRAINT fk_team_member_team FOREIGN KEY (team_id)
    REFERENCES team (id);

ALTER TABLE team_member_role
    ADD CONSTRAINT fk_team_member_role_role FOREIGN KEY (role_id)
    REFERENCES role (id);

ALTER TABLE team_member_role
    ADD CONSTRAINT fk_team_member_role_team_member FOREIGN KEY (team_member_id)
    REFERENCES team_member (id);
