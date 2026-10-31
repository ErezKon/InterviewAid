# 1117. Building H2O

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/building-h2o](https://leetcode.com/problems/building-h2o)
**Companies:** Google, Linkedin, Tesla

---

## Problem Description
There are two kinds of threads: `oxygen` and `hydrogen`. Your goal is to group these threads to form water molecules.

There is a barrier where each thread has to wait until a complete molecule can be formed. Hydrogen and oxygen threads will be given `releaseHydrogen` and `releaseOxygen` methods respectively, which will allow them to pass the barrier. These threads should pass the barrier in groups of three, and they must immediately bond with each other to form a water molecule. You must guarantee that all the threads from one molecule bond before any other threads from the next molecule do.

In other words:

- If an oxygen thread arrives at the barrier when no hydrogen threads are present, it must wait for two hydrogen threads.
- If a hydrogen thread arrives at the barrier when no other threads are present, it must wait for an oxygen thread and another hydrogen thread.

We do not have to worry about matching the threads up explicitly; the threads do not necessarily know which other threads they are paired up with. The key is that threads pass the barriers in complete sets; thus, if we examine the sequence of threads that bind and divide them into groups of three, each group should contain one oxygen and two hydrogen threads.

Write synchronization code for oxygen and hydrogen molecules that enforces these constraints.

**Constraints:**
- `3 * n == water.length`
- `1 ≤ n ≤ 20`
- `water[i]` is either `'H'` or `'O'`.
- There will be exactly `2 * n` `'H'` in `water`.
- There will be exactly `n` `'O'` in `water`.

## Examples
```
Example 1:
  Input: water = "HOH"
  Output: "HHO"
  Explanation: "HOH" and "OHH" are also valid answers.

Example 2:
  Input: water = "OOHHHH"
  Output: "HHOHHO"
  Explanation: "HOHHHO", "OHHHHO", "HHOHOH", "HOHHOH", "OHHHOH", "HHOOHH", "HOHOHH" and "OHHOHH" are also valid answers.
```

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
- **Time:** Each call performs a constant-time semaphore acquire/release and barrier wait → O(1).
- **Space:** O(1) extra synchronization primitives.

## Follow-Up Questions
1. How would you modify the design to allow a different ratio, e.g., `CH4` (one carbon, four hydrogens)?
2. Can you implement the same coordination using only mutexes and condition variables?
3. What are the potential deadlock scenarios and how does the barrier prevent them?

## Key Takeaway
Semaphores combined with a barrier enforce the exact count of required threads per molecule, guaranteeing correct ordering without busy-waiting.
