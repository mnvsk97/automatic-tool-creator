# SkillEvolve

**Self-improving agent skills through execution feedback**

---

## The Problem

[Agent Skills](https://www.claude.com/blog/skills) provide agents with specialized knowledge and capabilities—but they're static. Once created, a skill doesn't improve from experience. An agent using a frontend design skill will make the same mistakes on day 1 and day 100.

Traditional approaches require manual updates or expensive retraining. But what if skills could evolve on-the-job, learning from natural execution feedback? Like how an intern can rise up to be the CEO so long as they learn fast and persist.

## What We Built

SkillEvolve implements **continual learning for agent skills** using principles from [Agentic Context Engineering (ACE)](https://arxiv.org/abs/2510.04618). Instead of fixed instructions, skills become living knowledge bases that:

- **Accumulate patterns** from successful executions
- **Refine through feedback** (user preferences, validation results, errors)  
- **Grow incrementally** without catastrophic forgetting
- **Remain interpretable** (human-readable markdown, not black-box weights)

Think of it as on-the-job training for AI agents—learning from doing, not just from initial instructions.

## How It Works

The core evolution loop:

1. **Generate** - Agent produces multiple candidate solutions using current skill
2. **Execute** - Deploy candidates to sandboxes (via [Daytona](https://daytona.io)) for validation
3. **Reflect** - Analyze what worked/failed and extract learnings
4. **Curate** - Update skill with new patterns, refinements, edge cases

Unlike traditional prompt optimization (which compresses context), SkillEvolve preserves detailed domain knowledge as structured, retrievable patterns—directly inspired by ACE's approach to preventing LLM brevity bias and context collapse.

## The Demo

We evolve Anthropic's [frontend design skill](https://claude.com/blog/improving-frontend-design-through-skills) through building a personal budgeting app.

**User**: A frontend engineer who wants to improve their app's design  
**Goal**: Transform generic AI-generated UI into something unique and aesthetically pleasing  
**Interface**: [Claude Code](https://www.anthropic.com/news/claude-code) terminal with SkillEvolve + evolved frontend-design skill

**Evolution arc** (2-3 iterations):
- **Iteration 0**: Basic, generic layout (classic "AI slop" app)
- **Iteration 1**: Learns user preferences from first round of feedback  
- **Iteration 2**: Produces polished, unique design incorporating accumulated patterns

Each iteration, the agent generates 3 design candidates, spins them up in Daytona sandboxes, user picks their favorite and provides feedback. The skill evolves with each choice.

[Watch our Demo Video →](#)

## Tech Stack

- **[Claude Agent SDK](https://github.com/anthropics/anthropic-sdk-typescript)** - Agent orchestration
- **[Daytona](https://www.daytona.io/)** - Sandbox environments for generated code
- **[Sentry](https://sentry.io/)** - Error tracking and logs
- **[CodeRabbit](https://coderabbit.ai/)** - Automated code review
- **[Galileo](https://galileo.ai/)** - LLM observability and evaluations

## Why This Matters

Most AI systems are frozen at deployment. SkillEvolve explores a different paradigm: **agents that improve through use**, accumulating institutional knowledge and adapting to user preferences—without manual retraining or fine-tuning.

Skills as living documentation. Context as capability.

---

*Inspired by [Agentic Context Engineering](https://arxiv.org/abs/2510.04618) from Stanford & SambaNova*