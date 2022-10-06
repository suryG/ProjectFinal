using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Web.Http.Cors;
/*שכבת הנתונים*/
/*יוצרת את החיבור בין סישארפ לאסקיואל*/
namespace DAL
{
    [EnableCors(methods: "*", origins: "*", headers: "*")] 
    public class UserDAL
    {
        public static List<users> getAllUsers()
        {
            using (travel_agentEntities travel_agent = new travel_agentEntities())
            {
                return travel_agent.users.ToList();
            }
        }
        public static users getUser(string tz)
        {
            try
            {
                using (travel_agentEntities travel_agent = new travel_agentEntities())
                {
                    return travel_agent.users.FirstOrDefault(t => t.user_tz.Equals(tz));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public static int addNewUser(users u)
        {
            using (travel_agentEntities travel_agent = new travel_agentEntities())
            {
                var not = travel_agent.users.Where(no => no.user_tz.Equals(u.user_tz));
                if (not.Count() == 0)
                {
                    try
                    {
                        travel_agent.users.Add(u);
                        travel_agent.SaveChanges();
                        return 1;
                    }
                    catch { return 0; }
                }
                return 0;
            }
        }

       
        public static int checkLogin(string nameOfUser,string password)// בודקת אם פרטי כניסת משתמש תואמים למערכת
        {
            using (travel_agentEntities travel_agent = new travel_agentEntities())
            {
                var isCorrect = travel_agent.users.Where(n => n.firstName.Equals(nameOfUser) && n.pasword != password);//שם משתמש נמצא אך סיסמא שגויה
                if (isCorrect.Count() == 1)//סיסמא שגויה
                    return 0;//שם נכון סיסמא שגויה
                isCorrect = travel_agent.users.Where(n => n.firstName.Equals(nameOfUser));//שם לא נמצא
                if (isCorrect.Count() == 0)
                    return 1;//שם שגוי
                return 2;//שם וסיסמא נכונים
            }
        }
        public static int isRegistered(string user_tz)// בודקת אם המשתמש כבר רשום במערכת
        {
            using (travel_agentEntities travel_agentEntities = new travel_agentEntities())
            {
                var isRegisting = travel_agentEntities.users.Where(n => n.user_tz.Equals(user_tz));//המשתמש כבר רשום
                if (isRegisting.Count() == 1)//משתמש רשום
                    return 2;
                return 0;//פרטוים  תקינים ויתקבלו בהצלחה
            }

        }
        //public static string isMagia()
        //{

        //    string queryString = "select user_tz from users";
        //    using (travel_agentEntities travel_agentEntities = new travel_agentEntities())
        //    {
        //        SqlCommand command = new SqlCommand(queryString);
        //        SqlDataReader reader = command.ExecuteReader();

        //        while (reader.Read())
        //        {
        //            int i = 0;
        //            string r = reader.GetString(i);
        //            i++;
        //            return r;
        //        }
        //        return "ho";
        //    }
        //}
    }
}