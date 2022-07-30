import './PagesDescriptions.scss';

export const returnRandomSolutionPageDesc = () => {
    return (
        <p>
            This is an interactive Travelling salesman problem (TSP) solver with visualization.
            The chosen problem instance is
            <a href="https://en.wikipedia.org/wiki/Contiguous_United_States"> lower48</a>,
            so the goal is to traverse all state capital cities in contiguous (continental) United States
            with the shortest possible path and return to the origin city. This solver employs genetic
            algorithm (GA) metaheuristic, which mimics naturals selection mechanisms to find optimal solution.
            Solution fitness is a sum of traversed distances between the cities in given order calculated with
            <a href="https://en.wikipedia.org/wiki/Haversine_formula"> haversine formula</a>.
            Implemented operators of selection, crossover and mutation are described and visualized
            in this and following views.
            <br /><br />
            A solution can be represented as an array of integers where each number identifies
            one city, making up traversal order. With this assumption, generating a random solution
            equates to array shuffling. Solving lower48 problem starts with initial
            generation populated with random solutions.
            <br /><br />
            Click the button below to generate an example of random solution.
        </p>
    )
}

export const returnTournamentSelectPageDesc = () => {
    return (
        <p>
            Selection is the first stage of creating a new generation. It determines which solutions
            take part in crossover. This solver utilizes tournament selection, which consists of
            selecting the best (most fit, that is resulting in the shortest path) solution
            out of a subset (tournament) of randomly chosen solutions from the population.
            A number of solutions in the tournament matters because it regulates selection pressure.
            The higher it is, the smaller chance for weaker individuals to be selected.
            Tournament size of 1 results in lack of pressure and random selection.
            <br /><br />
            The process is repeated until a new population matches the previous one in size.
            Click the button below to run an instance of tournament selection with the size
            of 3 and a sample population with a size of 9. Each square represents a solution
            with a number as its fitness.
        </p>
    )
}

export const returnOnePointCrossoverPageDesc = () => {
    return (
        <p>
            Crossover operator is applied after selection stage. Crossover generates new solutions
            combining genetic information of two parents. This solver utilizes simple one-point
            crossover which consists of selecting a crossover point splitting parents'
            genetic material in two parts. The second part is swaped, creating new solutions.
            This approach may create corrupted offspring which in TSP means never visiting
            some locations or doing so more than once. In such cases a solution needs correction
            through removal of duplicated locations and addition of missing ones.
            <br /><br />
            The example below shows crossover point splitting two random solutions in half.
            Click the button below to perform crossover, and then highlight corrupted
            parts of a newly created solution and correct them. Note: the problem size
            was reduced to 20 for this view for readability.
        </p>
    )
}

export const returnInverseMutationPageDesc = () => {
    return (
        <p>
            Generation of a new population is complete after mutation stage. This operator serves
            as a measure to maintain genetic diversity within consecutive generations, analogous
            to biological mutation. This solver utilizes inverse mutation which consists of
            inversion of traversal order between two randomly chosen points.
            Both crossover and mutation operators occur with a predetermined probability, the
            appropriate definition of which is crucial for genetic algorithm performance.
            <br /><br />
            The example below shows a random solution undergoing inverse mutation.
        </p>
    )
}