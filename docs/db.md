erDiagram
Usuario {
int id PK
string nome
string email
string telefone
datetime createdAt
datetime updatedAt
datetime deletedAt
}

    Categoria {
        int id PK
        string nome
        datetime createdAt
        datetime updatedAt
    }

    Item {
        int id PK
        string nome
        string descricao
        int categoriaId FK
        datetime data
        string localizacao
        string contato
        string foto
        string status
        string codigoUnico
        int usuarioId FK
        datetime createdAt
        datetime updatedAt
        datetime deletedAt
    }

    Usuario ||--o{ Item : "cadastra"
    Categoria ||--o{ Item : "classifica"
