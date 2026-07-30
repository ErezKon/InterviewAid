# 1117. Building H2O

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/building-h2o](https://leetcode.com/problems/building-h2o)
**Companies:** Google, Linkedin, Tesla

---

## Problem Description
Implement a class `H2O` that provides two methods: `hydrogen()` and `oxygen()`. Multiple threads will call these methods to output the characters `'H'` and `'O'`. The methods must ensure that for every water molecule exactly two hydrogen threads and one oxygen thread are allowed to output, forming the string `"HHO"` (order within the molecule does not matter). The solution must work for any interleaving of threads.

## Examples
- If three threads call `hydrogen()`, `hydrogen()`, `oxygen()` in any order, the output must contain two `'H'` and one `'O'` (e.g., `"HHO"`).
- For a sequence of calls `hydrogen(), oxygen(), hydrogen(), hydrogen(), oxygen(), hydrogen()`, a valid output is `"HHOHHO"`.

## Approach
**Semaphore Coordination** – Use two semaphores: `hSem` initialized to 2 (allow two hydrogens) and `oSem` initialized to 0 (oxygen waits). A barrier of size 3 ensures that after two hydrogens and one oxygen have arrived, all three are released and the semaphores are reset for the next molecule.

```text
CLASS H2O:
    FUNCTION init():
        SET hSem ← Semaphore(2)
        SET oSem ← Semaphore(0)
        SET barrier ← Barrier(3, action=resetSemaphores)

    FUNCTION resetSemaphores():
        // After a molecule is formed, allow next two H and one O
        hSem.RELEASE(2)
        oSem.RELEASE(1)

    FUNCTION hydrogen():
        hSem.ACQUIRE()
        releaseHydrogen()          // prints "H"
        barrier.WAIT()

    FUNCTION oxygen():
        oSem.ACQUIRE()
        releaseOxygen()            // prints "O"
        barrier.WAIT()
```

## Walkthrough
1. First two hydrogen threads acquire `hSem` (decrement from 2 to 0) and wait at the barrier.
2. An oxygen thread acquires `oSem` (blocked until `resetSemaphores` releases it) and also waits at the barrier.
3. When the third thread arrives, the barrier releases all three; `resetSemaphores` restores the semaphore counts for the next molecule.

## Complexity Analysis
- **Time:** Each call performs a constant‑time semaphore acquire/release and barrier wait → O(1).
- **Space:** O(1) extra synchronization primitives.

## Follow‑Up Questions
1. How would you modify the design to allow a different ratio, e.g., `CH4` (one carbon, four hydrogens)?
2. Can you implement the same coordination using only mutexes and condition variables?
3. What are the potential deadlock scenarios and how does the barrier prevent them?

## Key Takeaway
Semaphores combined with a barrier enforce the exact count of required threads per molecule, guaranteeing correct ordering without busy‑waiting.
