            This is an interactive Travelling salesman problem (TSP) solver with visualization.
            The chosen problem instance is lower48 (https://en.wikipedia.org/wiki/Contiguous_United_States),
            so the goal is to traverse all state capital cities in contiguous (continental) United States
            with the shortest possible path and return to the origin city. This solver employs genetic
            algorithm (GA) metaheuristic, which mimics naturals selection mechanisms to find optimal solution.

            Light Bootstrap Dashboard template by Creative Tim was used http://www.creative-tim.com/product/light-bootstrap-dashboard-react.

            Problem instance dataset used: https://people.sc.fsu.edu/~jburkardt/datasets/states/state_capitals_ll.txt.
            Note: coords for Bismarck, ND appears to be incorrect in this dataset - 48.813343°N. Likely a typo instead of 46.813343°N. 
            The solver uses corrected data for this location.
