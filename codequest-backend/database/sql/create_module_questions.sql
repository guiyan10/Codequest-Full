-- Criar a tabela module_questions
CREATE TABLE IF NOT EXISTS `module_questions` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `module_id` bigint(20) UNSIGNED NOT NULL,
  `question_text` text NOT NULL,
  `question_type` enum('multiple_choice','true_false','open_ended') NOT NULL,
  `points` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `order_index` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `module_questions_module_id_foreign` (`module_id`),
  CONSTRAINT `module_questions_module_id_foreign` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Criar a tabela module_question_options
CREATE TABLE IF NOT EXISTS `module_question_options` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `question_id` bigint(20) UNSIGNED NOT NULL,
  `option_text` text NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `module_question_options_question_id_foreign` (`question_id`),
  CONSTRAINT `module_question_options_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `module_questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir algumas questões de teste
INSERT INTO `module_questions` (`module_id`, `question_text`, `question_type`, `points`, `order_index`, `created_at`, `updated_at`) VALUES
(1, 'O que é HTML?', 'multiple_choice', 1, 1, NOW(), NOW()),
(1, 'Qual tag HTML é usada para criar um link?', 'multiple_choice', 1, 2, NOW(), NOW());

-- Inserir as opções para a primeira questão
INSERT INTO `module_question_options` (`question_id`, `option_text`, `is_correct`, `created_at`, `updated_at`) VALUES
(1, 'Uma linguagem de programação', 0, NOW(), NOW()),
(1, 'Uma linguagem de marcação', 1, NOW(), NOW()),
(1, 'Um framework JavaScript', 0, NOW(), NOW());

-- Inserir as opções para a segunda questão
INSERT INTO `module_question_options` (`question_id`, `option_text`, `is_correct`, `created_at`, `updated_at`) VALUES
(2, '<link>', 0, NOW(), NOW()),
(2, '<a>', 1, NOW(), NOW()),
(2, '<href>', 0, NOW(), NOW()); 