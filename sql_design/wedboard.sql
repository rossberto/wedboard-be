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
  `profile_img_url` VARCHAR(253) NULL,
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
  `feast_location` VARCHAR(255) NULL,
  `civil_ceremony_date` DATETIME NULL,
  `civil_ceremony_location` VARCHAR(255) NULL,
  `religious_ceremony_date` DATETIME NULL,
  `religious_location` VARCHAR(255) NULL,
  `custom_ceremony_description` VARCHAR(255) NULL,
  `custom_ceremony_description_2` VARCHAR(255) NULL,
  `custom_ceremony_date` DATETIME NULL,
  `custom_ceremony_location` VARCHAR(255) NULL,
  `guests_quantity` INT NULL,
  `pinterest_board_url` VARCHAR(255) NULL,
  `google_drive_url` VARCHAR(255) NULL,
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
  `id` INT NOT NULL AUTO_INCREMENT,
  `last_modification_timestamp` DATETIME NULL,
  `status` VARCHAR(45) NULL,
  `active_step` TINYINT NULL DEFAULT 0,
  `Projects_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Surveys_Projects1_idx` (`Projects_id` ASC),
  UNIQUE INDEX `Projects_id_UNIQUE` (`Projects_id` ASC),
  CONSTRAINT `fk_Surveys_Projects1`
    FOREIGN KEY (`Projects_id`)
    REFERENCES `mydb`.`Projects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
  `name` VARCHAR(255) NOT NULL,
  `is_active` TINYINT NOT NULL DEFAULT 0,
  `country_iso_a3c` VARCHAR(3) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `join_date` DATETIME NOT NULL,
  `zip_code` VARCHAR(8) NULL,
  `address` VARCHAR(255) NULL,
  `address_optional` VARCHAR(255) NULL,
  `phone` VARCHAR(20) NULL,
  `web_page` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL,
  `status` VARCHAR(8) NOT NULL,
  `total_amount` DECIMAL(10,2) NOT NULL,
  `comments` VARCHAR(255) NULL,
  `paid_amount` DECIMAL(10,2) NULL,
  `remaining` DECIMAL(10,2) NULL,
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
  `subcategory` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ProviderServices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ProviderServices` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `description_optional` VARCHAR(255) NULL,
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
  `role` VARCHAR(255) NOT NULL,
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
  `residence_country` VARCHAR(45) NULL,
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
  `job_position` VARCHAR(255) NULL,
  `email_cc` VARCHAR(45) NULL,
  `Users_id` INT NOT NULL,
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
  `comments` VARCHAR(255) NULL,
  `comments_2` VARCHAR(255) NULL,
  `status` VARCHAR(45) NULL,
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
  `services` DECIMAL(10,2) NULL,
  `reception` DECIMAL(10,2) NULL,
  `montage` DECIMAL(10,2) NULL,
  `entertainment` DECIMAL(10,2) NULL,
  `location_related` DECIMAL(10,2) NULL,
  `hair_and_makeup` DECIMAL(10,2) NULL,
  `ceremony` DECIMAL(10,2) NULL,
  `wedding_cocktail` DECIMAL(10,2) NULL,
  `photo_video` DECIMAL(10,2) NULL,
  `floral_decoration` DECIMAL(10,2) NULL,
  `transportation` DECIMAL(10,2) NULL,
  `guest_services` DECIMAL(10,2) NULL,
  `aditional_services` DECIMAL(10,2) NULL,
  `customization` DECIMAL(10,2) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Payments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `paid_amount` DECIMAL(10,2) NOT NULL,
  `payment_date` DATETIME NOT NULL,
  `is_paid` TINYINT NULL DEFAULT 0,
  `is_cancelled` TINYINT NULL DEFAULT 0,
  `is_verified` TINYINT NULL DEFAULT 0,
  `payment_number` TINYINT NULL,
  `verification_date` DATETIME NULL,
  `payment_invoice_url` VARCHAR(253) NULL,
  `Orders_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Payments_Orders1_idx` (`Orders_id` ASC),
  CONSTRAINT `fk_Payments_Orders1`
    FOREIGN KEY (`Orders_id`)
    REFERENCES `mydb`.`Orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ProjectBalance`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ProjectBalance` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `total_budget` DECIMAL(10,2) NULL,
  `paid` DECIMAL(10,2) NULL,
  `remaining` DECIMAL(10,2) NULL,
  `last_update` DATETIME NULL,
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
-- Table `mydb`.`ProjectUsers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ProjectUsers` (
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


-- -----------------------------------------------------
-- Table `mydb`.`Todo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Todo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `due_date` DATETIME NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NULL,
  `notes` VARCHAR(255) NULL,
  `action_url` VARCHAR(255) NULL,
  `start_date` DATETIME NULL,
  `completed_date` DATETIME NULL,
  `completed` TINYINT NULL DEFAULT 0,
  `deleted` TINYINT NULL DEFAULT 0,
  `starred` TINYINT NULL DEFAULT 0,
  `important` TINYINT NULL DEFAULT 0,
  `ProjectServices_id` INT NULL,
  `Users_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Todo_ProjectServices1_idx` (`ProjectServices_id` ASC),
  INDEX `fk_Todo_Users1_idx` (`Users_id` ASC),
  CONSTRAINT `fk_Todo_ProjectServices1`
    FOREIGN KEY (`ProjectServices_id`)
    REFERENCES `mydb`.`ProjectServices` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Todo_Users1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `mydb`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ProviderServicesImages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ProviderServicesImages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `image_url` VARCHAR(255) NOT NULL,
  `alt` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NULL,
  `ProviderServices_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ProviderServicesImages_ProviderServices1_idx` (`ProviderServices_id` ASC),
  CONSTRAINT `fk_ProviderServicesImages_ProviderServices1`
    FOREIGN KEY (`ProviderServices_id`)
    REFERENCES `mydb`.`ProviderServices` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`ProviderSelection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ProviderSelection` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Orders_id_1` INT NOT NULL,
  `Orders_id_2` INT NOT NULL,
  `Orders_id_3` INT NOT NULL,
  `selected` TINYINT NULL DEFAULT 0,
  `cancelled` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_ProviderSelection_Orders1_idx` (`Orders_id_1` ASC),
  INDEX `fk_ProviderSelection_Orders2_idx` (`Orders_id_2` ASC),
  INDEX `fk_ProviderSelection_Orders3_idx` (`Orders_id_3` ASC),
  CONSTRAINT `fk_ProviderSelection_Orders1`
    FOREIGN KEY (`Orders_id_1`)
    REFERENCES `mydb`.`Orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ProviderSelection_Orders2`
    FOREIGN KEY (`Orders_id_2`)
    REFERENCES `mydb`.`Orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ProviderSelection_Orders3`
    FOREIGN KEY (`Orders_id_3`)
    REFERENCES `mydb`.`Orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Feedback` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `file_url` VARCHAR(255) NULL,
  `title` VARCHAR(45) NULL,
  `note` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  `comments` VARCHAR(255) NULL,
  `comments_2` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`WeddingConceptSection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`WeddingConceptSection` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `answer_1` VARCHAR(255) NULL,
  `answer_2` VARCHAR(255) NULL,
  `answer_3` VARCHAR(255) NULL,
  `answer_4` VARCHAR(255) NULL,
  `answer_5_food` VARCHAR(1) NULL,
  `answer_5_drinks` VARCHAR(1) NULL,
  `answer_5_decoration` VARCHAR(1) NULL,
  `answer_5_illumination` VARCHAR(1) NULL,
  `answer_5_music` VARCHAR(1) NULL,
  `answer_5_place` VARCHAR(1) NULL,
  `answer_5_flowers` VARCHAR(1) NULL,
  `answer_5_service` VARCHAR(1) NULL,
  `answer_5_photo` VARCHAR(1) NULL,
  `answer_5_video` VARCHAR(1) NULL,
  `Surveys_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_WeddingConceptSection_Surveys1_idx` (`Surveys_id` ASC),
  UNIQUE INDEX `Surveys_id_UNIQUE` (`Surveys_id` ASC),
  CONSTRAINT `fk_WeddingConceptSection_Surveys1`
    FOREIGN KEY (`Surveys_id`)
    REFERENCES `mydb`.`Surveys` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`BudgetSection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`BudgetSection` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `answer_1_budget` DECIMAL(10,2) NULL,
  `answer_2` VARCHAR(255) NULL,
  `answer_3` VARCHAR(255) NULL,
  `Surveys_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_BudgetSection_Surveys1_idx` (`Surveys_id` ASC),
  UNIQUE INDEX `Surveys_id_UNIQUE` (`Surveys_id` ASC),
  CONSTRAINT `fk_BudgetSection_Surveys1`
    FOREIGN KEY (`Surveys_id`)
    REFERENCES `mydb`.`Surveys` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`GuestsSection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`GuestsSection` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `answer_1` VARCHAR(255) NULL,
  `answer_2_guests_qty` INT NULL,
  `answer_3_estimated_attendants` INT NULL,
  `Surveys_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_GuestsSection_Surveys1_idx` (`Surveys_id` ASC),
  UNIQUE INDEX `Surveys_id_UNIQUE` (`Surveys_id` ASC),
  CONSTRAINT `fk_GuestsSection_Surveys1`
    FOREIGN KEY (`Surveys_id`)
    REFERENCES `mydb`.`Surveys` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CeremonySection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`CeremonySection` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `answer_1_religious` TINYINT NULL,
  `answer_1_legal` TINYINT NULL,
  `answer_1_symbolic` TINYINT NULL,
  `answer_1_other` TINYINT NULL,
  `answer_2` VARCHAR(255) NULL,
  `answer_3` VARCHAR(255) NULL,
  `answer_4` VARCHAR(255) NULL,
  `answer_5` VARCHAR(255) NULL,
  `answer_6` VARCHAR(255) NULL,
  `answer_7` VARCHAR(255) NULL,
  `answer_8` VARCHAR(255) NULL,
  `Surveys_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_CeremonySection_Surveys1_idx` (`Surveys_id` ASC),
  UNIQUE INDEX `Surveys_id_UNIQUE` (`Surveys_id` ASC),
  CONSTRAINT `fk_CeremonySection_Surveys1`
    FOREIGN KEY (`Surveys_id`)
    REFERENCES `mydb`.`Surveys` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`WeddingDaySection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`WeddingDaySection` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `answer_1` VARCHAR(255) NULL,
  `answer_2` VARCHAR(255) NULL,
  `answer_3` VARCHAR(255) NULL,
  `answer_4` VARCHAR(3) NULL,
  `answer_5` VARCHAR(3) NULL COMMENT 'answer_4 and answer_5 have Yes/No values',
  `answer_6` VARCHAR(255) NULL,
  `answer_7` VARCHAR(255) NULL,
  `answer_8_people_qty` INT NULL,
  `answer_9` VARCHAR(255) NULL,
  `Surveys_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_WeddingDaySection_Surveys1_idx` (`Surveys_id` ASC),
  UNIQUE INDEX `Surveys_id_UNIQUE` (`Surveys_id` ASC),
  CONSTRAINT `fk_WeddingDaySection_Surveys1`
    FOREIGN KEY (`Surveys_id`)
    REFERENCES `mydb`.`Surveys` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`AmbientSection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`AmbientSection` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `answer_1` VARCHAR(255) NULL,
  `answer_2` VARCHAR(255) NULL,
  `answer_3` VARCHAR(255) NULL,
  `answer_4` VARCHAR(255) NULL,
  `answer_5` VARCHAR(255) NULL,
  `Surveys_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_AmbientSection_Surveys1_idx` (`Surveys_id` ASC),
  UNIQUE INDEX `Surveys_id_UNIQUE` (`Surveys_id` ASC),
  CONSTRAINT `fk_AmbientSection_Surveys1`
    FOREIGN KEY (`Surveys_id`)
    REFERENCES `mydb`.`Surveys` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`EntertainmentSection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`EntertainmentSection` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `answer_1` VARCHAR(255) NULL,
  `answer_2` VARCHAR(255) NULL,
  `answer_3` VARCHAR(255) NULL,
  `answer_4` VARCHAR(255) NULL,
  `Surveys_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_EntertainmentSection_Surveys1_idx` (`Surveys_id` ASC),
  UNIQUE INDEX `Surveys_id_UNIQUE` (`Surveys_id` ASC),
  CONSTRAINT `fk_EntertainmentSection_Surveys1`
    FOREIGN KEY (`Surveys_id`)
    REFERENCES `mydb`.`Surveys` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`FinalSection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`FinalSection` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `answer_1` VARCHAR(255) NULL,
  `answer_2` VARCHAR(255) NULL,
  `Surveys_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_FinalSection_Surveys1_idx` (`Surveys_id` ASC),
  UNIQUE INDEX `Surveys_id_UNIQUE` (`Surveys_id` ASC),
  CONSTRAINT `fk_FinalSection_Surveys1`
    FOREIGN KEY (`Surveys_id`)
    REFERENCES `mydb`.`Surveys` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`CeremonyServices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`CeremonyServices` (
  `id` INT NOT NULL,
  `ceremony_church` TINYINT NULL DEFAULT 0,
  `same_event_location` TINYINT NULL DEFAULT 0,
  `religious_ceremony_live_music` TINYINT NULL DEFAULT 0,
  `missal` TINYINT NULL DEFAULT 0,
  `church_officer` TINYINT NULL DEFAULT 0,
  `religious_ceremony_audio_equipment` TINYINT NULL DEFAULT 0,
  `recliners` TINYINT NULL DEFAULT 0,
  `religious_ceremony_guest_chairs` TINYINT NULL DEFAULT 0,
  `legal_ceremony_place` TINYINT NULL DEFAULT 0,
  `judge` TINYINT NULL DEFAULT 0,
  `legal_ceremony_live_music` TINYINT NULL DEFAULT 0,
  `legal_ceremony_audio_equipment` TINYINT NULL DEFAULT 0,
  `legal_ceremony_sign_table` TINYINT NULL DEFAULT 0,
  `legal_ceremony_couple_chairs` TINYINT NULL DEFAULT 0,
  `legal_ceremony_guest_chairs` TINYINT NULL DEFAULT 0,
  `symbolic_ceremony_place` TINYINT NULL DEFAULT 0,
  `symbolic_officer` TINYINT NULL DEFAULT 0,
  `symbolic_ceremony_live_music` TINYINT NULL DEFAULT 0,
  `symbolic_ceremony_audio_equipment` TINYINT NULL DEFAULT 0,
  `symbolic_ceremony_guest_chairs` TINYINT NULL DEFAULT 0,
  `ceremony_carpet` TINYINT NULL DEFAULT 0,
  `outside_decoration` TINYINT NULL DEFAULT 0,
  `podium` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
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
