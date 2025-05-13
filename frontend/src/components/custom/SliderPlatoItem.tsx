import React from 'react'
import { Text, View, Image } from "react-native";
import { useProductForCategory } from '../../hooks/useCategories';
import Producto from './Producto';
import { ScrollView } from 'react-native';
interface Plato {
    id: string;
    nameCategoria: string;
}
function SliderPlatoItem({ id, nameCategoria }: Plato) {
    const { data, isLoading, error } = useProductForCategory(id);
    return (
        <>
            <Text className="px-3 justify-start text-zinc-800 text-3xl font-normal font-['Chau_Philomene_One']">{nameCategoria}</Text>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={{
                    flexDirection: 'row',
                    gap: 12,
                    paddingHorizontal: 10,
                }}
            >
                {
                    data?.data.map((producto) =>
                        <Producto name={producto.name} price={producto.price} url_img={producto.img_reference} />
                    )
                }
            </ScrollView>
        </>
    )
}
export default SliderPlatoItem