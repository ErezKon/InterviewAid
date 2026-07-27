# 752. Open the Lock

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/open-the-lock](https://leetcode.com/problems/open-the-lock)
**Companies:** Amazon, Bloomberg, Coupang, De Shaw, Ebay, Goldman Sachs, Google, Linkedin, Meta, Microsoft, Oracle, Snapchat, Tiktok, Uber, Zip

---

## Approach: BFS — O(10⁴) ✅

Treat each 4-digit state as a node. BFS from "0000" to target, avoiding deadends.

```
FUNCTION openLock(deadends, target):
    dead = SET(deadends)
    IF "0000" IN dead: RETURN -1

    queue = [("0000", 0)]
    visited = {"0000"}

    WHILE queue:
        (state, turns) = queue.DEQUEUE()
        IF state == target: RETURN turns

        FOR each neighbor (turn one wheel up/down):
            IF neighbor NOT IN visited AND neighbor NOT IN dead:
                visited.ADD(neighbor)
                queue.ENQUEUE((neighbor, turns + 1))

    RETURN -1
```

Each state has 8 neighbors (4 wheels × 2 directions). Total states = 10,000.
