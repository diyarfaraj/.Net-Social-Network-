namespace Application.Activities
{
    public class AttendeeDto
    {
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string image { get; set; }
        public bool IsHost { get; set; }

        public bool Following { get; set; }
    }
}