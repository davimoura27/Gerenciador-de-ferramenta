import { useEffect, useState } from "react";
import type { Equipment } from "../types/Equipment";
import { createEquipments, deleteEquipment, getEquipments, updateEquipment } from "../api/equipmentApi";
import { ToastNotify } from "../utils/ToastNotify";

export function useEquipments(){
    const [equipments, setEquipments] = useState<Equipment[]>([]);

    useEffect(() => {
        getEquipments().then(response => { setEquipments(response.data);}).catch(() => 
            ToastNotify.error("Erro ao carregar equipamentos"));
    }, []);

    const addEquipment = (equipmentData: {
        name: string;
        serialNumber: string;
        model: string;
        categoryId: number;
        brandId: number;
        status: string;
        description: string;
        purchaseDate: string;
        purchaseValue: number;
    }) => {
        return createEquipments(equipmentData).then(() => { return getEquipments()})
            .then(response => { setEquipments(response.data);
                ToastNotify.success("Equipamento cadastrado com sucesso")}).catch(error => {
                ToastNotify.error("Erro ao cadastrar equipamento");
                console.error(error);
                throw error;
            });
    }

    const editEquipment = (id: number, equipmentData: {
        name: string;
        serialNumber: string;
        model: string;
        categoryId: number;
        brandId: number;
        status: string;
        description: string;
        purchaseDate: string;
        purchaseValue: number;
    }) => {
        return updateEquipment(id, equipmentData).then(() => {return getEquipments()})
            .then(response => {setEquipments(response.data); 
                ToastNotify.success("Equipamento atualizado com sucesso")}).catch(error => {
                ToastNotify.error("Erro ao atualizar equipamento");
                console.error(error);
                throw error;
            })
    }

    const delEquipment = (id: number) => {
        return deleteEquipment(id).then(() => {setEquipments(
            prevEquipments => prevEquipments.filter(equipment => equipment.id !== id));
            ToastNotify.success("Equipamento excluído com sucesso")})
                .catch(error => {ToastNotify.error("Erro ao excluir equipamento");
                                 console.error(error);
                                 throw error;
                });
    }

    return {
        equipments,
        setEquipments,
        addEquipment,
        editEquipment,
        delEquipment,
    };

}
