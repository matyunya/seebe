var HallForm = React.createClass({
     propTypes: {
        halls: React.PropTypes.array,
     },
     getInitialState: function() {
         return {
             value: 'Выберите площадку и укажите цены на билеты'
         }
     },
     change: function(event){
         this.setState({value: event.target.value});
     },
     render: function(){
        var rows = [];

        return(
           <div>
               <select name="concert[hall_id]" id="concert_hall_id" onChange={this.change} value={this.state.value}>
                  <option selected></option>
                  {this.props.halls.map((hall)=>
                    <option value={hall.attributes.id}>{hall.attributes.name}</option>
                  )}
               </select>
               <p><TicketPricesForm hall_id={this.state.value} halls={this.props.halls} /></p>
           </div>
        );
     }
});

var TicketPricesForm = React.createClass({
     propTypes: {
        halls: React.PropTypes.array,
        hall_id: React.PropTypes.integer
     },
     getInitialState: function() {
         return {
             hall_id: 1
         }
     },
     change: function(event){
         this.setState({value: event.target.value});
     },
     render: function(){
        var rows = [];

        return(
           <div>
               <select name="concert[prices][]" id="concert_prices" onChange={this.change} value={this.state.value}>
                  {this.props.halls.map((hall)=>
                    <option value={hall.attributes.id}>{hall.attributes.name}</option>
                  )}
               </select>
           </div>
        );
     }
});