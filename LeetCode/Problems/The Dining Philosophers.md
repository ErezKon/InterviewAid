# 1226. The Dining Philosophers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-dining-philosophers](https://leetcode.com/problems/the-dining-philosophers)
**Companies:** Bloomberg, Microsoft
---

## Problem Description
Five philosophers sit at a round table, each with a fork to their left and right. A philosopher needs both adjacent forks to eat. Implement a concurrency solution that prevents deadlock and starvation, allowing philosophers to alternately think and eat.

## Examples
**Example:**
```
Philosopher 0 picks up fork 0 and fork 1 → eats → puts down forks.
All philosophers repeat without deadlock.
```

## Approach
Use a semaphore limiting the number of philosophers that may try to pick up forks simultaneously to four (N‑1). Each philosopher acquires the semaphore, then locks the lower‑indexed fork first, then the higher‑indexed fork, ensuring a global ordering that avoids circular wait. After eating, they release the forks and the semaphore.

```text
FUNCTION philosopher(id):
    WHILE true:
        THINK()
        semaphore.ACQUIRE()               // allow at most N-1 philosophers
        left ← id
        right ← (id + 1) MOD N
        // lock forks in a consistent order to avoid deadlock
        IF left < right:
            fork[left].LOCK()
            fork[right].LOCK()
        ELSE:
            fork[right].LOCK()
            fork[left].LOCK()
        EAT()
        // release forks
        fork[left].UNLOCK()
        fork[right].UNLOCK()
        semaphore.RELEASE()
```

## Walkthrough
| Philosopher | Action sequence |
|------------|-----------------|
| 0 | acquire semaphore → lock fork0 → lock fork1 → eat → unlock → release semaphore |
| 1 | may wait if semaphore full, then lock fork1 & fork2, etc. |
| … | ensures at most 4 philosophers hold forks, breaking circular wait |

## Complexity Analysis
- Time: O(∞) as philosophers run indefinitely; each eat/thinking cycle is O(1).
- Space: O(N) for fork mutexes and the semaphore.

## Follow‑Up Questions
1. How would you modify the solution to use a monitor with condition variables instead of a semaphore?
2. Can you achieve deadlock‑free execution without limiting concurrency (e.g., using a resource hierarchy)?
3. What changes are needed to detect and recover from a deadlock if it occurs?

## Key Takeaway
Limiting concurrent fork acquisition and enforcing a global lock order prevents deadlock in the dining philosophers problem.
