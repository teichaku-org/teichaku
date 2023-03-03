import { CreateDaoStepper } from "@/components/create-dao/CreateDaoStepper"
import { ReviewDaoInfo } from "@/components/create-dao/ReviewDaoInfo"
import { SetDaoInfo } from "@/components/create-dao/SetDaoInfo"
import { SetReward } from "@/components/create-dao/SetReward"
import { WaitingDeploy } from "@/components/create-dao/WaitingDeploy"
import NetworkCheck from "@/components/web3/common/NetworkCheck"
import { Center, Container } from "@mantine/core"

interface Props {
  isWeb3: boolean
}
const Page = ({ isWeb3 }: Props) => {
  const step1 = () => {
    return (
      <Container mt="md">
        <SetDaoInfo isWeb3={isWeb3} />
      </Container>
    )
  }

  const step2 = () => {
    return (
      <Container mt="md">
        <SetReward isWeb3={isWeb3} />
      </Container>
    )
  }

  const step3 = () => {
    return (
      <Container mt="md">
        <ReviewDaoInfo isWeb3={isWeb3} />
      </Container>
    )
  }

  const completedStep = () => {
    return (
      <Container mt="md" p="xl">
        <WaitingDeploy isWeb3={isWeb3} />
      </Container>
    )
  }

  return (
    <Container my="xl">
      <NetworkCheck isWeb3={isWeb3} />
      <CreateDaoStepper
        step1Component={step1()}
        step2Component={step2()}
        step3Component={step3()}
        completedComponent={completedStep()}
      />
    </Container>
  )
}

export async function getServerSideProps(context: { query: { daoId: string } }) {
  // create daoは常にweb3はfalse
  return { props: { isWeb3: false } }
}
Page.noNavbar = true
export default Page
