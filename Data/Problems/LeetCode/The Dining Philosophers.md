# 1226. The Dining Philosophers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-dining-philosophers](https://leetcode.com/problems/the-dining-philosophers)
**Companies:** Bloomberg, Microsoft
---

## Problem Description
Five silent philosophers sit at a round table with bowls of spaghetti. Forks are placed between each pair of adjacent philosophers.

Each philosopher must alternately think and eat. However, a philosopher can only eat spaghetti when they have both left and right forks. Each fork can be held by only one philosopher and so a philosopher can use the fork only if it is not being used by another philosopher. After an individual philosopher finishes eating, they need to put down both forks so that the forks become available to others. A philosopher can take the fork on their right or the one on their left as they become available, but cannot start eating before getting both forks.

Eating is not limited by the remaining amounts of spaghetti or stomach space; an infinite supply and an infinite demand are assumed.

Design a discipline of behaviour (a concurrent algorithm) such that no philosopher will starve; i.e., each can forever continue to alternate between eating and thinking, assuming that no philosopher can know when others may want to eat or think.

*The problem statement is taken from [wikipedia.org](https://en.wikipedia.org/wiki/Dining_philosophers_problem).*

The philosophers' ids are numbered from **0** to **4** in a **clockwise** order. Implement the function `void wantsToEat(philosopher, pickLeftFork, pickRightFork, eat, putLeftFork, putRightFork)` where:

- `philosopher` is the id of the philosopher who wants to eat.
- `pickLeftFork` and `pickRightFork` are functions you can call to pick the corresponding forks of that philosopher.
- `eat` is a function you can call to let the philosopher eat once he has picked both forks.
- `putLeftFork` and `putRightFork` are functions you can call to put down the corresponding forks of that philosopher.
- The philosophers are assumed to be thinking as long as they are not asking to eat (the function is not being called with their number).

Five threads, each representing a philosopher, will simultaneously use one object of your class to simulate the process. The function may be called for the same philosopher more than once, even before the last call ends.

**Constraints:**
- `1 <= n <= 60`

## Examples
```
Example 1:
  Input: n = 1
  Output: [[3,2,1],[3,1,1],[3,0,3],[3,1,2],[3,2,2],[4,2,1],[4,1,1],[2,2,1],[2,1,1],[1,2,1],[2,0,3],
           [2,1,2],[2,2,2],[4,0,3],[4,1,2],[4,2,2],[1,1,1],[1,0,3],[1,1,2],[1,2,2],[0,1,1],[0,2,1],
           [0,0,3],[0,1,2],[0,2,2]]
  Explanation:
  n is the number of times each philosopher will call the function.
  The output array describes the calls you made to the functions controlling the forks and the eat
  function, its format is:
  output[i] = [a, b, c] (three integers)
  - a is the id of a philosopher.
  - b specifies the fork: {1 : left, 2 : right}.
  - c specifies the operation: {1 : pick, 2 : put, 3 : eat}.
```

## Approach
Use a semaphore limiting the number of philosophers that may try to pick up forks simultaneously to four (N-1). Each philosopher acquires the semaphore, then locks the lower-indexed fork first, then the higher-indexed fork, ensuring a global ordering that avoids circular wait. After eating, they release the forks and the semaphore.

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

## Follow-Up Questions
1. How would you modify the solution to use a monitor with condition variables instead of a semaphore?
2. Can you achieve deadlock-free execution without limiting concurrency (e.g., using a resource hierarchy)?
3. What changes are needed to detect and recover from a deadlock if it occurs?

## Key Takeaway
Limiting concurrent fork acquisition and enforcing a global lock order prevents deadlock in the dining philosophers problem.
