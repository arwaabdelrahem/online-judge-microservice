import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { DockerSandBox } from './docker-sandbox';

@Injectable()
export class ProblemsService {
  async solve(data: number[]) {
    const { language, code, problem } = data as any;
    const passedTestCases = [];

    const testCases = await Promise.all(
      problem.testCases.map(async (testCase) => {
        const stdin_data = testCase.input;
        // const path = __dirname + '/'; //current working path
        const folder = 'temp/' + this.random(10); //folder in which the temporary folder will be saved
        const vm_name = 'virtual_machine'; //name of virtual machine that we want to execute
        const timeout_value = 60; //Timeout Value, In Seconds
        // console.log('# DIRNAME : ', __dirname)
        // console.log('# DIRNAME AFTER UPDATE : ', __dirname.replace('dist', 'src'))
        const sandbox = new DockerSandBox({
          timeout_value,
          // path: '/home/remah/Desktop/online-judge/src/problems/',
          path: `${__dirname.replace('dist', 'src')}/`,
          folder,
          vm_name,
          compiler_name: language.compilerName,
          file_name: language.fileName,
          code,
          output_command: language.outputCommand,
          languageName: language.languageName,
          e_arguments: language.extraArguments,
          stdin_data,
        });
        const { data, time, errors } = await sandbox.run();
        const output = data
          .trim()
          .split('\n')
          .map(function (string) {
            return string.trim();
          });
        const expectedOutput = testCase.expectedOutput
          .trim()
          .split('\n')
          .map(function (string) {
            return string.trim();
          });
        const input = testCase.input
          .trim()
          .split('\n')
          .map(function (string) {
            return string.trim();
          });
        if (!expectedOutput.every((val, index) => val === output[index])) {
          //failed test case
          passedTestCases.push(false);
        } else {
          //passed test case
          passedTestCases.push(true);
        }
        return {
          input,
          output,
          expectedOutput,
          // code,
          language: language.languageName,
          errors,
          time,
        };
      }),
    );
    if (passedTestCases.some((val) => val === false)) {
      return {
        message: 'wrong answer: test case failed',
        testCases,
      };
    } else {
      return {
        message: 'Success',
        testCases,
      };
    }
  }

  private random(size: number) {
    //returns a crypto-safe random
    return randomBytes(size).toString('hex');
  }
}
