
SELECT * FROM users

INSERT INTO "users" ("id", "name", "email", "password", "birthDate", "createdAt", "updatedAt")
VALUES
('d96e95c1-e37d-41a4-9e7f-7798b3c3c1a1', 'Administrador Principal', 'admin@seuprojeto.com', 'senha_segura_123', '1990-01-01 00:00:00.000 +0000', NOW(), NOW());

SELECT * FROM client

INSERT INTO "client" ("id", "name", "email", "cpf", "phone")
VALUES
('0e7e17c0-a7d5-4b13-a44d-5c8a41a41b2b', 'João da Silva', 'joao.silva@cliente.com', '111.111.111-11', '(11) 98765-4321'),
('1f8f28d1-b8e6-5c24-b55e-6d9b52b52c3c', 'Maria de Souza', 'maria.souza@cliente.com', '222.222.222-22', '(21) 99887-7665');


SELECT * FROM chamado

INSERT INTO "chamado" ("id", "titulo", "descricao", "status", "email", "manutencao", "createdAt")
VALUES
('2g9g39e2-c9f7-6d35-c66f-7e0c63c63d4d', 'Erro ao logar no sistema', 'Não consigo acessar o sistema após a última atualização. Recebo um erro 500.', 'Aberto', 'joao.silva@cliente.com', 'Não, é erro de software.', NOW()),
('3h0h40f3-d0g8-7e46-d77g-8f1d74d74e5e', 'Problema na impressora do setor A', 'A impressora X está puxando o papel de forma errada, amassando as folhas.', 'Em Andamento', 'maria.souza@cliente.com', 'Sim, verificar hardware da impressora.', NOW() - INTERVAL '1 hour');


SELECT * FROM comentario

INSERT INTO "comentario" ("id", "chamadoId", "content", "emailClient", "createdAt", "updatedAt")
VALUES
('4i1i51g4-e1h9-8f57-e88h-9g2e85e85f6f', '2g9g39e2-c9f7-6d35-c66f-7e0c63c63d4d', 'Já tentei limpar o cache e o problema persiste.', 'joao.silva@cliente.com', NOW() + INTERVAL '1 minute', NOW() + INTERVAL '1 minute'),
('5j2j62h5-f2i0-9g68-f99i-0h3f96f96g7g', '3h0h40f3-d0g8-7e46-d77g-8f1d74d74e5e', 'O técnico pode vir na parte da tarde?', 'maria.souza@cliente.com', NOW() + INTERVAL '2 minutes', NOW() + INTERVAL '2 minutes');

