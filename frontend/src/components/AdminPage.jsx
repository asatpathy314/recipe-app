import { useEffect, useContext, useState } from 'react'
import { AuthContext } from './AuthProvider'
import { SimpleGrid, Heading, Link} from '@chakra-ui/react'
import axios from 'axios'
import RecipePreview from './RecipePreview'

const AdminPage = () => {
    const { accessToken, email } = useContext(AuthContext)
    const [recipes, setRecipes] = useState([])
    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get('http://localhost:8000/recipe/unapproved', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            setRecipes(response.data)
        }
        fetchData();
    }, [accessToken]);

    return (
        <>
           <div className='main-container'>
                <Heading mb={6}>Approve or deny new recipes</Heading>
                <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                    spacing={5}>
                    {recipes.map((recipe, idx)=>{ return (
                        <Link key={idx} href={`/recipe/${recipe.id}`}>
                            <RecipePreview data={recipe} forAdmin={true}/>
                        </Link>
                    )
                    })}
                </SimpleGrid>
            </div>
        </>
    )
}

export default AdminPage