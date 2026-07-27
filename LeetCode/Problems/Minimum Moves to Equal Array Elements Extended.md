# Array Equalization Patterns

Related: #453, #462, #2137, #1551

---

| Problem | Operation | Answer |
|---------|-----------|--------|
| Min Moves (#453) | Inc n-1 elements | sum - n*min |
| Min Moves II (#462) | Inc/dec 1 element | Sum of |x - median| |
| Equal Water (#2137) | Pour between | Limited by min + capacity |
| Min Ops All Equal (#1551) | Inc/dec by any | Sort, prefix sums |

Key insight for #453: incrementing n-1 by 1 ≡ decrementing 1 by 1.
