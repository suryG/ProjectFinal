using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
/*שכבה של ההמרות*/
/*ממירה בין אוביקט של אסקיאל לשל סישרפ*/

/*מחזיקה את האוביקט בדל יש  את האוביקא מהאסקיואל מביא קלס מוכן כשמחברת בין הסישרפ לאסקיאל*/
namespace DTO
{
    public class UserDTO
    {
        public string user_tz { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string pasword { get; set; }
        public string email { get; set; }
    }
}
