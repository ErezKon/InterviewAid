# 913. Cat and Mouse

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/cat-and-mouse](https://leetcode.com/problems/cat-and-mouse)
**Companies:** Amazon, Bloomberg, Google, Microsoft, Zip

---

## Approach: BFS from Terminal States — O(n³) ✅

```
FUNCTION catMouseGame(graph):
    n = len(graph)
    // State: (mouse, cat, turn) → 0=draw, 1=mouse wins, 2=cat wins
    // Terminal: mouse at 0 → mouse wins; cat == mouse → cat wins

    // BFS backwards from known terminal states
    // Process states whose outcome becomes determined

    // Return state (1, 2, MOUSE_TURN)
```

Minimax with BFS from terminal positions. Complex but O(n³) states.
