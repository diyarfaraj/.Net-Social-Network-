using System;

namespace Domain
{
    public class Value
    {
        private object p1;
        private object p2;

        public Value(object p1, object p2)
        {
            this.p1 = p1;
            this.p2 = p2;
        }

        public int Id {get; set;}

        public string Name {get; set;}
    }
}
