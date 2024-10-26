import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import PomodoroTimer from '../PomodoroTimer.vue'

describe('PomodoroTimer', () => {
  it('should render the component correctly', () => {
    render(PomodoroTimer, {
      props: { initialWorkTime: 1500, initialBreakTime: 300 },
    })

    expect(screen.getByText('Work Time')).toBeDefined()
    expect(screen.getByText('25:00')).toBeDefined()
    expect(screen.getByRole('button', { name: /Start/i })).toBeDefined()
  })
})
