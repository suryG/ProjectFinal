using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using BLL;
using System.Web.Http.Cors;

/*השכבה המקשרת בין האנגולר לסישארפ*/
namespace webApi.Controllers
{
    [EnableCors(origins: "*", methods: "*", headers: "*")]
    [RoutePrefix("useri")]

    public class UserController : ApiController
    {
        [HttpGet]
        [Route("getAllUsers")]
        public List<DTO.UserDTO> getAllUsers()
        {
            return BLL.UserBLL.getAllUsers(); 
        }

        // GET api/values
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet]
        [Route("getUser")]
        public DTO.UserDTO Get(string id)
        {
            return BLL.UserBLL.getUser(id);
        }

        // POST api/values
        [HttpGet]
        [Route("isRegistered")]
        public int isRegistered([FromUri] string tz)
        {
            return BLL.UserBLL.isRegistered(tz);
        }

        [HttpGet]
        [Route("checkLogin")]
        public int checkLogin([FromUri] string name, [FromUri] string pass)
        {
            try
            {
                return BLL.UserBLL.checkLogin(name, pass);
            }
            catch (Exception e)
            {
                 Console.WriteLine(e);
                return -1;
            } 
        }

        // PUT api/values/5
        [HttpPost]
        [Route("addNewUser")]
        public int addNewUser([FromBody] DTO.UserDTO user )
        {
            try {
                return BLL.UserBLL.addNewUser(user); 
            }
            catch
            {
                return 0;
            }
            
        }
        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
