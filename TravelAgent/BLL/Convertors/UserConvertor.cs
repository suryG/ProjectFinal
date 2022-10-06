using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Convertors
{
    class UserConvertor
    {

        public static DAL.users convertUserToDal(DTO.UserDTO userDTO)
        {
            return new DAL.users()
            {
                user_tz = userDTO.user_tz,
                firstName = userDTO.firstName,
                lastName = userDTO.lastName,
                pasword = userDTO.pasword,
                email = userDTO.email
            };/*DTO TO DALL & DALL TO DTO*/

        }
        /*ממיר אוביקט של אסקיאל להצגה למשתמש-(לאנגולר)*/
        public static DTO.UserDTO convertUserToDto(DAL.users userDAL)
        {
            return new DTO.UserDTO()
            {
                user_tz = userDAL.user_tz,
                firstName = userDAL.firstName,
                lastName = userDAL.lastName,
                pasword = userDAL.pasword,
                email = userDAL.email

            };/*DTO TO DALL & DALL TO DTO*/
        }
        public static List<DTO.UserDTO> convertUserToDtoList(List<DAL.users> usersDAL)
        {
            var listUser = new List<DTO.UserDTO>();
            foreach (var user in usersDAL)
            {
                listUser.Add(convertUserToDto(user));
            }
            return listUser;
        }

    }
}
