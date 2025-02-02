using Microsoft.AspNetCore.Mvc; 

namespace ReactApp3reco.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private static readonly List<User> Users = new()
        {
            new User { Id = 1, Name = "Ahmet", Email = "ahmet@example.com" },
            new User { Id = 2, Name = "Mehmet", Email = "mehmet@example.com" },
            new User { Id = 3, Name = "Ayşe", Email = "ayse@example.com" }
        };


        [HttpGet("getusers")] 
        public IEnumerable<User> GetUsers()
        {
            return Users;
        }

        [HttpGet("{id}")]
        public ActionResult<User> GetUserById(int id)
        {
            var user = Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost("adduser")]
        public ActionResult<User> AddUser(User user)
        {
            Users.Add(user);
            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }
        [HttpDelete("deleteuser/{id}")]
        public ActionResult<User> DeleteUser(int id)
        {
            var user = Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            Users.Remove(user);
            return Ok();
        }
        [HttpPut("updateuser/{id}")]
        public ActionResult UpdateUser(int id, [FromBody] User user)
        {
            var existingUser = Users.FirstOrDefault(u => u.Id == id);
            if (existingUser == null)
            {
                return NotFound();
            }
            existingUser.Name = user.Name;
            existingUser.Email = user.Email;
            return Ok();
        }
    }


    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}