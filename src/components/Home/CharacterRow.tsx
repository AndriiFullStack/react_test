import React from 'react';
import { Character } from '../../utils/type';
import { Link } from 'react-router-dom';
import DefaultUserAvatar from '../../assets/images/user.jpg';

type Props = {
    character: Character
}

const CharacterRow = ({ character } : Props) => {
    return <tr className="bg-white border-b min-h-[5rem] dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <th className="px-6 py-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <Link to={`/detail/${character.id}`} className='hover:cursor-pointer hover:underline'>
            {character.name}
        </Link>
    </th>
    <td className="px-6 py-2 text-center">
        {character.status}
    </td>
    <td className="px-6 py-2 text-center">
        {character.species}
    </td>
    <td className="px-6 py-2 text-center">
        <img className='max-w-[4rem] min-h-[4rem] mx-auto rounded-xl' src={character.image == "" ? DefaultUserAvatar : character.image} alt="avatar" />
    </td>
</tr>;
}


export default CharacterRow;