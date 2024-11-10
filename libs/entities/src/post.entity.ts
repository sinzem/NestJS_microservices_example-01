import { Entity, PrimaryColumn, Column } from "typeorm";

/* (настройки таблицы posts) */
@Entity("posts")
export class PostEntity {
    @PrimaryColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    message: string;

    /* (отдельно прописываем названия для колонок, имя которых из нескольких слов, через тире или нижние подчеркивания, camelCase работать не будет) */
    @Column({name: "author_id"})  
    authorId: string;

    @Column({name: "is_published"})
    isPublished: boolean;

    @Column({name: "created_at"})
    createdAt: string;

    @Column({name: "updated_at"})
    updatedAt: string;
} /* (экспортируем, сущности подключаем через index из этой папки) */