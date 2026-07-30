# 752. Open the Lock

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/open-the-lock](https://leetcode.com/problems/open-the-lock)
**Companies:** Amazon, Bloomberg, Coupang, De Shaw, Ebay, Goldman Sachs, Google, Linkedin, Meta, Microsoft, Oracle, Snapchat, Tiktok, Uber, Zip

---

## Problem Description
You are given a lock with four circular wheels, each showing a digit from 0 to 9. The lock starts at "0000". You can turn each wheel forward or backward by one digit per move. A list of "deadends" represents forbidden combinations; if the lock displays any of them, it becomes stuck. Given a target combination, return the minimum number of moves required to reach the target without entering a deadend. Return -1 if impossible.

## Examples
**Example 1**
```
deadends = ["0201","0101","0102","1212","2002"]
target = "0202"
Output: 6
```
Explanation: One shortest path is "0000" → "1000" → "1100" → "1200" → "1201" → "1202" → "0202".

**Example 2**
```
deadends = ["8888"]
target = "0009"
Output: 1
```
Explanation: Turn the last wheel forward.

## Approach
Use Breadth‑First Search (BFS) on the implicit graph where each node is a 4‑digit state and edges connect states that differ by one wheel turn. BFS guarantees the shortest path.

```text
FUNCTION openLock(deadends, target):
    SET dead ← SET(deadends)
    IF "0000" IN dead: RETURN -1
    SET queue ← [("0000", 0)]   // state, moves
    SET visited ← {"0000"}
    WHILE queue NOT EMPTY:
        SET (state, moves) ← queue.DEQUEUE()
        IF state == target: RETURN moves
        FOR i FROM 0 TO 3:
            FOR delta IN [+1, -1]:
                SET digit ← (INTEGER(state[i]) + delta) MOD 10
                SET neighbor ← state[0:i] + STRING(digit) + state[i+1:]
                IF neighbor NOT IN visited AND neighbor NOT IN dead:
                    visited.ADD(neighbor)
                    queue.ENQUEUE((neighbor, moves + 1))
    RETURN -1
```

## Walkthrough
| Step | Current State | Queue (state, moves) | Visited |
|------|---------------|----------------------|---------|
| 0 | "0000" | [("0000",0)] | {"0000"} |
| 1 | Dequeue "0000" → generate 8 neighbors, enqueue non‑dead | [("1000",1), ("9000",1), …] | add enqueued |
| … | Continue until "0202" is dequeued at moves = 6 |

## Complexity Analysis
- **Time:** O(10⁴) – at most 10,000 possible states, each processed once.
- **Space:** O(10⁴) for the visited set and queue.

## Follow‑Up Questions
1. How would you modify the algorithm if the lock had *n* wheels?
2. Can you solve the problem using bidirectional BFS to reduce the search space?
3. How would you handle weighted moves where turning a wheel costs different amounts?

## Key Takeaway
Model the lock as a graph of states and use BFS to find the shortest sequence of moves while avoiding deadends.