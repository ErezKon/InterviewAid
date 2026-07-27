# 3147. Taking Maximum Energy From the Mystic Dungeon

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/taking-maximum-energy-from-the-mystic-dungeon](https://leetcode.com/problems/taking-maximum-energy-from-the-mystic-dungeon)
**Companies:** Amazon, Bloomberg, Google, Ibm, Jpmorgan

---

```
FUNCTION maximumEnergy(energy, k):
    n = len(energy)
    // Suffix sum with step k
    FOR i ← n - k - 1 DOWN TO 0:
        energy[i] += energy[i + k]
    RETURN MAX(energy)
```
