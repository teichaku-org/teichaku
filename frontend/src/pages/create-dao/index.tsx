import { CreateDaoStepper } from "@/components/create-dao/CreateDaoStepper"
import { ReviewDaoInfo } from "@/components/create-dao/ReviewDaoInfo"
import { SetDaoInfo } from "@/components/create-dao/SetDaoInfo"
import { SetReward } from "@/components/create-dao/SetReward"
import { WaitingDeploy } from "@/components/create-dao/WaitingDeploy"
import { Web3FlagAtom } from "@/domains/atoms/Web3FlagAtom"
import { Center, Container } from "@mantine/core"
import { useAtom } from "jotai"
import { useEffect } from "react"

interface Props {
  isWeb3: boolean
}
const Page = ({ isWeb3 }: Props) => {
  const [_, setIsWeb3Flag] = useAtom(Web3FlagAtom)
  useEffect(() => {
    setIsWeb3Flag(isWeb3)
  }, [isWeb3])

  const step1 = () => {
    return (
      <Container mt="md">
        <SetDaoInfo />
      </Container>
    )
  }

  const step2 = () => {
    return (
      <Container mt="md">
        <SetReward />
      </Container>
    )
  }

  const step3 = () => {
    return (
      <Container mt="md">
        <ReviewDaoInfo />
      </Container>
    )
  }

  const completedStep = () => {
    return (
      <Container mt="md" p="xl">
        <WaitingDeploy />
      </Container>
    )
  }

  return (
    <Container my="xl">
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
  // Fetch data from external API
  return { props: { isWeb3: false } }
}

Page.noNavbar = true
export default Page
