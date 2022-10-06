using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
/*לוגיקה*/
/*מתווכת בין הווב איפיאי לדל*/
/*מתקשרת עם הדיטיאו*/
namespace BLL
{
    public class UserBLL
    {
        public static List<DTO.UserDTO> getAllUsers()
        {
            return Convertors.UserConvertor.convertUserToDtoList(DAL.UserDAL.getAllUsers());
        }
        public static DTO.UserDTO getUser(string pass)
        {
         return Convertors.UserConvertor.convertUserToDto(DAL.UserDAL.getUser(pass));
        }
        public static int addNewUser(DTO.UserDTO user)
        {
            return DAL.UserDAL.addNewUser(Convertors.UserConvertor.convertUserToDal(user));
        }
        public static int isRegistered(string tz)
        {
            return DAL.UserDAL.isRegistered(tz);
        }
        public static int checkLogin(string name,string pass)
        {
            return DAL.UserDAL.checkLogin(name,pass);
        }
        //public static string isMagia()
        //{
        //    return DAL.UserDAL.isMagia();
        //}
    }//webapi bll dal 
}
