// docs: https://www.npmjs.com/package/node-cron
// Allowed fields
//  # ┌────────────── second (optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── month
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *
/* eslint-disable no-console */
import cron from 'node-cron'
import cronstrue from 'cronstrue'

export interface TaksConstructor {
  expression: string,
  action: Function | any,
  options?: TaksOptions
}

export interface TaksOptions {
  name: string
  timeZone?: string // 'America/Argentina/Buenos_Aires'
  scheduled?: boolean
}
export interface TaskInstance extends cron.ScheduledTask {
  name?: string
  start: () => void
  stop: () => void
}

export class Task {
  private name: string
  private expression: string
  private frequency: string
  private action: Function
  private options: cron.ScheduleOptions
  private instance: TaskInstance | undefined
  private executions: number

  constructor({ expression, action, options }: TaksConstructor) {
    this.name = options?.name || 'task' + new Date().getTime()
    this.expression = expression
    this.frequency = cronstrue.toString(this.expression)
    this.action = action
    this.options = options || {}
    this.instance = this.getTaskInstance()
    this.executions = 0
  }

  // @getters
  public getExpression() {
    return this.expression
  }
  public getFrequency() {
    return this.frequency
  }
  public getAction() {
    return this.action
  }
  public getOptions() {
    return this.options
  }
  public getExecutions() {
    return this.executions
  }

  // @methods
  public getTaskInstance() {
    if (!cron.validate(this.expression)) {
      console.error('Invalid expression', this.expression)
      return undefined
    }
    
    if (!this.instance) {
      const actionAndLogger = () => {
        this.action()
        this.executions++
        console.log('✅ Running: ', this.executions)
      }
      this.instance = cron.schedule(this.expression, actionAndLogger, this.options)
    }
    
    return this.instance
  }
  public start() {
    console.log('🟢 Starting task 📅: ', this.name)
    this.instance?.start()
  }
  public stop() {
    console.log('🔴 Stopping task 📅: ', this.name)
    this.instance?.stop()
  }
  public printFrequency() {
    console.log('Frequency 🪧: ', this.frequency)
  }
}

