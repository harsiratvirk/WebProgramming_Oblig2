package oslomet.oblig_2.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import oslomet.oblig_2.Models.Movies;
import oslomet.oblig_2.Models.Ticket;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TicketController {
    public List<Ticket> tickets = new ArrayList<>(); // List to store ticket objects

    // Endpoint to retrieve a list of available movies
    @GetMapping("/saveMovies")
    public List<Movies> getMovies() {
        List<Movies> movies = new ArrayList<>();
        movies.add(new Movies("Jatt & Juliet"));
        movies.add(new Movies("Arjan Vailley"));
        movies.add(new Movies("Carry on Jatta 3"));
        movies.add(new Movies("Rush Hour"));
        return movies;
    }

    // Endpoint to save ticket data
    @PostMapping("/saveTickets")
    public void saveTickets(Ticket innTicket) {
        tickets.add(innTicket);
    }

    // Endpoint to retrieve a list of saved tickets
    @GetMapping("/getTickets")
    public List<Ticket> getTickets() {
        return tickets;
    }

    // Endpoint to delete all saved tickets
    @GetMapping("/deleteTickets")
    public void deleteTickets() {
        tickets.clear();
    }
}