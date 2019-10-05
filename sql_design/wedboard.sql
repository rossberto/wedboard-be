-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `last_name_2` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  `type` VARCHAR(8) NOT NULL,
  `join_date` DATETIME NOT NULL,
  `birthdate` VARCHAR(45) NULL,
  `gender` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `token` VARCHAR(45) NULL,
  `is_online` TINYINT NULL DEFAULT 0,
  `is_forbidden` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Projects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Projects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `creation_timestamp` DATETIME NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `feast_date` DATETIME NOT NULL,
  `feast_location` VARCHAR(254) NULL,
  `civil_ceremony_date` DATETIME NULL,
  `civil_ceremony_location` VARCHAR(254) NULL,
  `religious_ceremony_date` DATETIME NULL,
  `religious_location` VARCHAR(254) NULL,
  `custom_ceremony_description` VARCHAR(254) NULL,
  `custom_ceremony_description_2` VARCHAR(254) NULL,
  `custom_ceremony_date` DATETIME NULL,
  `custom_ceremony_location` VARCHAR(254) NULL,
  `guests_quantity` INT NULL,
  `pinterest_board_url` VARCHAR(254) NULL,
  `status` VARCHAR(45) NULL,
  `created_by` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Projects_Users1_idx` (`created_by` ASC),
  CONSTRAINT `fk_Projects_Users1`
    FOREIGN KEY (`created_by`)
    REFERENCES `mydb`.`Users` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Surveys`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Surveys` (
  `id` INT NOT NULL,
  `last_modification_timestamp` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`WeddingConcept`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`WeddingConcept` (
  `id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`SurveyBudget`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`SurveyBudget` (
  `id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`SurveyGuests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`SurveyGuests` (
  `id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`PlaceAndDate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`PlaceAndDate` (
  `id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`WeddingFundamentals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`WeddingFundamentals` (
  `id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`WeddingSettings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`WeddingSettings` (
  `id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Entertainment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Entertainment` (
  `id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`InitialStatus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`InitialStatus` (
  `id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Providers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Providers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(254) NOT NULL,
  `is_active` TINYINT NOT NULL DEFAULT 0,
  `country_iso_a3c` VARCHAR(3) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `join_date` DATETIME NOT NULL,
  `zip_code` VARCHAR(8) NULL,
  `address` VARCHAR(254) NULL,
  `address_optional` VARCHAR(254) NULL,
  `phone` VARCHAR(20) NULL,
  `web_page` VARCHAR(254) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL,
  `comments` VARCHAR(254) NULL,
  `status` VARCHAR(8) NOT NULL DEFAULT 'Quote',
  `amount` DECIMAL(10,2) NOT NULL,
  `Projects_id` INT NOT NULL,
  `Providers_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Orders_Projects1_idx` (`Projects_id` ASC),
  INDEX `fk_Orders_Providers1_idx` (`Providers_id` ASC),
  CONSTRAINT `fk_Orders_Projects1`
    FOREIGN KEY (`Projects_id`)
    REFERENCES `mydb`.`Projects` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_Orders_Providers1`
    FOREIGN KEY (`Providers_id`)
    REFERENCES `mydb`.`Providers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`WedboardServices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`WedboardServices` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `service` VARCHAR(45) NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ProviderServices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ProviderServices` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(254) NOT NULL,
  `description_optional` VARCHAR(254) NULL,
  `min_range` INT NOT NULL,
  `max_range` INT NOT NULL,
  `range_unit` VARCHAR(45) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `provider_service_code` VARCHAR(45) NULL,
  `Providers_id` INT NOT NULL,
  `WedboardServices_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ProviderServices_Providers1_idx` (`Providers_id` ASC),
  INDEX `fk_ProviderServices_WedboardServices1_idx` (`WedboardServices_id` ASC),
  CONSTRAINT `fk_ProviderServices_Providers1`
    FOREIGN KEY (`Providers_id`)
    REFERENCES `mydb`.`Providers` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_ProviderServices_WedboardServices1`
    FOREIGN KEY (`WedboardServices_id`)
    REFERENCES `mydb`.`WedboardServices` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`PlannerUsers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`PlannerUsers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `is_current_employee` TINYINT NOT NULL DEFAULT 1,
  `role` VARCHAR(254) NOT NULL,
  `Users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Users_id`),
  UNIQUE INDEX `Users_id_UNIQUE` (`Users_id` ASC),
  CONSTRAINT `fk_PlannerUsers_Users1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `mydb`.`Users` (`id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CoupleUsers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`CoupleUsers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nationality` VARCHAR(3) NULL,
  `residence_country` VARCHAR(3) NULL,
  `residence_city` VARCHAR(45) NULL,
  `occupation` VARCHAR(45) NULL,
  `religion` VARCHAR(20) NULL,
  `children` INT NULL,
  `color1` VARCHAR(6) NULL,
  `color2` VARCHAR(6) NULL,
  `color3` VARCHAR(6) NULL,
  `Users_id` INT NOT NULL,
  `partner_id` INT NULL,
  PRIMARY KEY (`id`, `Users_id`),
  INDEX `fk_CoupleUsers_Users2_idx` (`partner_id` ASC),
  UNIQUE INDEX `Users_id_UNIQUE` (`Users_id` ASC),
  CONSTRAINT `fk_CoupleUsers_Users1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `mydb`.`Users` (`id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_CoupleUsers_Users2`
    FOREIGN KEY (`partner_id`)
    REFERENCES `mydb`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ProviderUsers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ProviderUsers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `job_position` VARCHAR(254) NULL,
  `Users_id` INT NOT NULL,
  `email_cc` VARCHAR(45) NULL,
  `Providers_id` INT NULL,
  PRIMARY KEY (`id`, `Users_id`),
  INDEX `fk_ProviderUsers_Providers1_idx` (`Providers_id` ASC),
  UNIQUE INDEX `Users_id_UNIQUE` (`Users_id` ASC),
  UNIQUE INDEX `Providers_id_UNIQUE` (`Providers_id` ASC),
  CONSTRAINT `fk_ProviderUsers_Users1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `mydb`.`Users` (`id`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_ProviderUsers_Providers1`
    FOREIGN KEY (`Providers_id`)
    REFERENCES `mydb`.`Providers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ProjectServices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ProjectServices` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT NULL,
  `comments` VARCHAR(254) NULL,
  `comments_2` VARCHAR(254) NULL,
  `Projects_id` INT NOT NULL,
  `WedboardServices_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ProjectServices_Projects1_idx` (`Projects_id` ASC),
  INDEX `fk_ProjectServices_WedboardServices1_idx` (`WedboardServices_id` ASC),
  CONSTRAINT `fk_ProjectServices_Projects1`
    FOREIGN KEY (`Projects_id`)
    REFERENCES `mydb`.`Projects` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_ProjectServices_WedboardServices1`
    FOREIGN KEY (`WedboardServices_id`)
    REFERENCES `mydb`.`WedboardServices` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`OrderServices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`OrderServices` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT NOT NULL,
  `cost` DECIMAL(10,2) NOT NULL,
  `ProjectServices_id` INT NOT NULL,
  `Orders_id` INT NOT NULL,
  `ProviderServices_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_OrderServices_ProjectServices1_idx` (`ProjectServices_id` ASC),
  INDEX `fk_OrderServices_Orders1_idx` (`Orders_id` ASC),
  INDEX `fk_OrderServices_ProviderServices1_idx` (`ProviderServices_id` ASC),
  CONSTRAINT `fk_OrderServices_ProjectServices1`
    FOREIGN KEY (`ProjectServices_id`)
    REFERENCES `mydb`.`ProjectServices` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_OrderServices_Orders1`
    FOREIGN KEY (`Orders_id`)
    REFERENCES `mydb`.`Orders` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_OrderServices_ProviderServices1`
    FOREIGN KEY (`ProviderServices_id`)
    REFERENCES `mydb`.`ProviderServices` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`BudgetDistribution`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`BudgetDistribution` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `total` DECIMAL(10,2) NOT NULL,
  `category_1` DECIMAL(10,2) NULL,
  `category_2` DECIMAL(10,2) NULL,
  `category_3` DECIMAL(10,2) NULL,
  `category_4` DECIMAL(10,2) NULL,
  `category_5` DECIMAL(10,2) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Payments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `OrderServices_id` INT NOT NULL,
  `paid_amount` DECIMAL(10,2) NOT NULL,
  `remaining` DECIMAL(10,2) NOT NULL,
  `is_paid` TINYINT NULL DEFAULT 0,
  `is_cancelled` TINYINT NULL DEFAULT 0,
  `is_verified` TINYINT NULL DEFAULT 0,
  `payment_number` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Payments_OrderServices1_idx` (`OrderServices_id` ASC),
  CONSTRAINT `fk_Payments_OrderServices1`
    FOREIGN KEY (`OrderServices_id`)
    REFERENCES `mydb`.`OrderServices` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ProjectFinances`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ProjectFinances` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `total_budget` DECIMAL(10,2) NULL,
  `total_paid` DECIMAL(10,2) NULL,
  `remaining` DECIMAL(10,2) NULL,
  `Projects_id` INT NOT NULL,
  `BudgetDistribution_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ProjectFinances_Projects1_idx` (`Projects_id` ASC),
  INDEX `fk_ProjectFinances_BudgetDistribution1_idx` (`BudgetDistribution_id` ASC),
  CONSTRAINT `fk_ProjectFinances_Projects1`
    FOREIGN KEY (`Projects_id`)
    REFERENCES `mydb`.`Projects` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT,
  CONSTRAINT `fk_ProjectFinances_BudgetDistribution1`
    FOREIGN KEY (`BudgetDistribution_id`)
    REFERENCES `mydb`.`BudgetDistribution` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ProjectFinances_pairs_Payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ProjectFinances_pairs_Payments` (
  `ProjectFinances_id` INT NOT NULL,
  `Payments_id` INT NOT NULL,
  PRIMARY KEY (`ProjectFinances_id`, `Payments_id`),
  INDEX `fk_ProjectFinances_pairs_Payments_Payments1_idx` (`Payments_id` ASC),
  INDEX `fk_ProjectFinances_pairs_Payments_ProjectFinances1_idx` (`ProjectFinances_id` ASC),
  CONSTRAINT `fk_ProjectFinances_pairs_Payments_ProjectFinances1`
    FOREIGN KEY (`ProjectFinances_id`)
    REFERENCES `mydb`.`ProjectFinances` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ProjectFinances_pairs_Payments_Payments1`
    FOREIGN KEY (`Payments_id`)
    REFERENCES `mydb`.`Payments` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Users_pairs_Projects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Users_pairs_Projects` (
  `Users_id` INT NOT NULL,
  `Projects_id` INT NOT NULL,
  PRIMARY KEY (`Users_id`, `Projects_id`),
  INDEX `fk_Users_pairs_Projects_Projects1_idx` (`Projects_id` ASC),
  INDEX `fk_Users_pairs_Projects_Users1_idx` (`Users_id` ASC),
  CONSTRAINT `fk_Users_pairs_Projects_Users1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `mydb`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Users_pairs_Projects_Projects1`
    FOREIGN KEY (`Projects_id`)
    REFERENCES `mydb`.`Projects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `mydb` ;

-- -----------------------------------------------------
--  routine1
-- -----------------------------------------------------

DELIMITER $$
USE `mydb`$$
$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
