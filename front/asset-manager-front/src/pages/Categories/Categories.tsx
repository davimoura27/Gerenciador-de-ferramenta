import { useState } from "react";
import { CategoryTable } from "../../components/Categories/CategoryTable/CategoryTable";
import { useCategories } from "../../hooks/useCategories";
import type { Category } from "../../types/Category";
import { CategoryForm } from "../../components/Categories/CategoryForm/CategoryForm";
import "./Category.css";
import { ToastNotify } from "../../utils/ToastNotify";

export function Categories(){
    const {categories, addCategory, editCategory, removeCategory} = useCategories();
    const [name, setName] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<{ id: number; name: string } | null>(null);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(categoryToEdit){
            editCategory(categoryToEdit.id, name).then(() => {
                handleCancelForm();
                ToastNotify.success("Categoria atualizada com sucesso")
            }).catch(error => {
                console.error(error)
                ToastNotify.error("Erro ao atualizar categoria")
            });            
        } else{
            addCategory(name).then(() => {
                setName("");
                handleCancelForm();
                ToastNotify.success("Categoria cadastrada com sucesso")
            }).catch(error => {
                console.error(error)
                ToastNotify.error("Erro ao cadastrar categoria")
            });
        }
    }

    const handleEditCategory = (category: Category) => {
        setName(category.name);
        setShowForm(true);
        setCategoryToEdit(category)
    }

    const handleCancelForm = () => {
        setShowForm(false);
        setCategoryToEdit(null);
        setName("");
    }

    const handleDeleteCategory = (category: Category) => {
        ToastNotify.confirm(`Tem certeza que deseja excluir a categoria ${category.name}?`,
           () => removeCategory(category.id).then(() => ToastNotify.success("Categoria exluida com sucesso"))
                    .catch(error => {
                        console.error(error);
                        ToastNotify.error("Erro ao excluir categoria")
                    })
        )

    }

    return(
        <div className="categories-page" >
            <h1>Categorias</h1>
            <button
                className="new-category-button"
                type="button"
                onClick={() => setShowForm(true)}>
                Nova categoria
            </button>
            {showForm && (
                <CategoryForm
                    name={name}
                    setName={setName}
                    categoryToEdit={categoryToEdit}
                    onSubmit={onSubmit}
                    onCancel={handleCancelForm} 
                />
            )}
                <CategoryTable 
                    categories={categories} 
                    onEditCategory={handleEditCategory} 
                    onDeleteCategory={handleDeleteCategory}
                />
        </div>
    )
}

