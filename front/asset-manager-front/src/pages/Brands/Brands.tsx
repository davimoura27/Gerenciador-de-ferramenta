import { useState } from "react";
import { useBrands } from "../../hooks/useBrands"
import type { Brand } from "../../types/Brand";
import { BrandTable } from "../../components/Brands/BrandTable/BrandTable";
import { BrandForm } from "../../components/Brands/BrandForm/BrandForm";
import "./Brands.css";
import { ToastNotify } from "../../utils/ToastNotify";

export function Brands(){
    const {brands, addBrand, editBrand, removeBrand} = useBrands();
    const [name, setName] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [brandToEdit, setBrandToEdit] = useState<{id: number; name: string} | null>(null);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(brandToEdit){
            editBrand(brandToEdit.id, name).then(() => { 
                handleCancelForm();
                ToastNotify.success("Marca atualizada com sucesso")
            }).catch(error => {console.error(error)
                ToastNotify.error("Erro ao atualizar marca")});
        }else{
            addBrand(name).then(() => {setName("");
                handleCancelForm();
                ToastNotify.success("Marca cadastrada com sucesso")
            }).catch(error => {console.error(error)
                ToastNotify.error("Erro ao cadastrar marca")
            });
        }
    }

    const handleEditBrand = (brand: Brand) => {
        setShowForm(true);
        setBrandToEdit(brand);
        setName(brand.name);
    }
    
    const handleCancelForm = () => {
        setShowForm(false)
        setBrandToEdit(null);
        setName("");
    }

    const handleDeleteBrand = (brand: Brand) => {
        ToastNotify.confirm(`Tem certeza que deseja excluir a marca ${brand.name}?`,
            () => removeBrand(brand.id).then(() => ToastNotify.success("Marca exluida com sucesso"))
                    .catch(error => {
                        console.error(error);
                        ToastNotify.error("Erro ao excluir marca")})
        );        
    }

    return(
        <div className = "brands-page" >
                    <h1>Marcas</h1>                 
            <button 
                className="new-brand-button" 
                type="button" 
                onClick={() => {setShowForm(true); setName("");}}>
                Nova marca
            </button>

            {showForm && 
                <BrandForm 
                    name={name}
                    setName={setName}
                    brandToEdit={brandToEdit}
                    onSubmit={onSubmit}
                    onCancel={handleCancelForm}
                />         
            }
                <BrandTable 
                    brands={brands} 
                    onEditBrand={handleEditBrand} 
                    onDeleteBrand={handleDeleteBrand} 
                />
        </div>
    )
}
